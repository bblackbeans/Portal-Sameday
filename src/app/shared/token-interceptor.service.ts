import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, filter, take, switchMap } from 'rxjs/operators';
import { throwError as observableThrowError, Observable, BehaviorSubject } from 'rxjs';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { LoginService } from '../components/login/login.service';
import { JwtHelperService } from './lib/jwt-helper.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  tokenGetter: (
    request?: HttpRequest<any>
  ) => string | null | Promise<string | null>;
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(
    private _loginService: LoginService,
    private snackbar: MatSnackBar
  ) { }

  private accessExpired(): Observable<never> {
    this.isRefreshing = false;
    this.refreshTokenSubject.next(null);
    const snack = this.snackbar.open('Acesso expirado!', 'Entrar novamente', {
      verticalPosition: 'top',
      panelClass: 'token-exp'
    });
    snack
      .afterOpened()
      .subscribe(() => {
        setTimeout(() => {
          snack.dismiss();
          this._loginService.exit();
        }, 5000);
      });
    snack
      .onAction()
      .subscribe(() => {
        this._loginService.exit();
      });
    return observableThrowError({
      status: 'error',
      message: 'Acesso Expirado! <br/> Entre novamente.'
    });
  }

  private addToken(request: HttpRequest<any>, token: string): HttpRequest<any> {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  private handleRefresh(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.isRefreshing) {
      return this.refreshTokenSubject.pipe(
        filter(token => token != null),
        take(1),
        switchMap(authToken => {
          return next.handle(this.addToken(request, authToken));
        }));
    } else {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);
      return this.accessExpired();
    }
  }

  private handle401Error(_request: HttpRequest<any>, _next: HttpHandler, error: HttpErrorResponse): Observable<HttpEvent<any>> {
    if (this._loginService.authenticatedUser()) {
      return this.accessExpired();
    } else {
      return observableThrowError(error);
    }
  }

  private handle403Error(request: HttpRequest<any>, next: HttpHandler, error: HttpErrorResponse): Observable<HttpEvent<any>> {
    if (this._loginService.authenticatedUser()) {
      return this.handleRefresh(request, next);
    } else {
      return observableThrowError(error);
    }
  }

  private handle504Error(error: HttpErrorResponse): Observable<HttpEvent<any>> {
    return observableThrowError({
      status: 'error',
      message: 'Erro de comunicação<br/> Verifique a conexão e tente novamente.',
      additional: error
    });
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const request = req.clone({
      setHeaders: {
        'X-Client-UTCOffset': `${new Date().getTimezoneOffset()}`
      }
    });

    let whiteList = false;
    if (request.url.indexOf('oauth/token') > -1 || request.url.indexOf('acesso/logout') > -1) {
      whiteList = true;
    }

    if (this._loginService.authenticatedUser()) {
      const helper = new JwtHelperService();

      const token = req.headers.get('Authorization');
      const isExpired = helper.isTokenExpired(token);

      if (isExpired && (request.url.indexOf('portal') > -1 && !whiteList)) {
        return this.handleRefresh(req, next);
      }
    }
    return next.handle(request).pipe(
      catchError(error => {
        if (error instanceof HttpErrorResponse && error.status === 401 && !whiteList) {
          return this.handle401Error(request, next, error);
        } else if (error instanceof HttpErrorResponse && error.status === 403 && !whiteList) {
          return this.handle403Error(request, next, error);
        } else if (error instanceof HttpErrorResponse && error.status === 504) {
          return this.handle504Error(error);
        } else {
          return observableThrowError(error);
        }
      }));
  }
}