
import { Injectable } from '@angular/core';
import { Subscription, Observable, of, throwError } from 'rxjs';
import { catchError, delay, map, mergeMap, retryWhen } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { LoginService } from '../components/login/login.service';

@Injectable()
export class HttpService {

  headers: HttpHeaders;
  idleTimeout = false;
  idleStatus: Subscription;

  constructor(
    private _http: HttpClient,
    private _loginService: LoginService,
  ) { }

  private extractData(res: HttpResponse<any>): {} {
    const body = res;
    return body || {};
  }

  private handleError(error: Error | HttpErrorResponse): Promise<never> {
    let errMsg: any;
    if (error instanceof HttpErrorResponse) {
      const err = error.error;
      err.status = err.status ? err.status : error.status;
      errMsg = err;
    } else {
      errMsg = {
        status: 'error',
        message: (error.message ? error.message : error.toString())
      };
    }
    return Promise.reject(errMsg);
  }

  private prepareHeader(headers: HttpHeaders, url: string): void {
    this.headers = headers ? headers : new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });

    if (!this.headers.get('Content-type')) {
      this.headers = this.headers.set('Content-Type', 'application/json; charset=utf-8');
    }

    let objToken = null;

    // Set Auth header
    objToken = this._loginService.getToken();

    if (objToken) {
      this.headers = this.headers.set('Authorization', 'Bearer ' + objToken.access_token);
    }

    const user = this._loginService.getUser();

    if (user) {
      this.headers = this.headers.set('idUser', `${user.id}`);
      this.headers = this.headers.set('profile', `${user.profile}`);
      this.headers = this.headers.set('typeUser', `${user.typeUser}`);
    }
  }

  private retornaIdle(_tipo): Observable<any> {
    return new Observable(observer => {
      observer.next({
        status: 'idle'
      });
      observer.complete();
    });
  }

  get(url: string, params?: any, headers?: HttpHeaders): Observable<any> {
    // Standby system
    if (this.idleTimeout) {
      return this.retornaIdle('get: ' + url);
    }

    this.prepareHeader(headers, url);
    const options = { headers: this.headers, params: new HttpParams() };

    if (params) {
      options.params = params;
    }

    return this._http.get(url, options).pipe(
      retryWhen((errors: Observable<any>) => errors.pipe(
        delay(2000),
        mergeMap(error => {
          if (error.status === 401) {
            return of(error);
          }
          return throwError(error);
        })
      )),
      map(this.extractData),
      catchError(this.handleError));
  }

  post(url: string, params: any, headers?: HttpHeaders): Observable<any> {
    // Standby system
    if (this.idleTimeout) {
      return this.retornaIdle('post: ' + url);
    }

    this.prepareHeader(headers, url);
    const options = { headers: this.headers };

    return this._http.post(url, { params }, options).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  put(url: string, params: any, headers?: HttpHeaders): Observable<any> {
    // Standby system
    if (this.idleTimeout) {
      return this.retornaIdle('put: ' + url);
    }

    this.prepareHeader(headers, url);
    const options = { headers: this.headers };

    return this._http.put(url, { params }, options).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  delete(url: string, headers?: HttpHeaders): Observable<any> {
    // Standby system
    if (this.idleTimeout) {
      return this.retornaIdle('delete: ' + url);
    }

    this.prepareHeader(headers, url);
    const options = { headers: this.headers };

    return this._http.delete(url, options).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

}