import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { map, catchError } from 'rxjs/operators';
import { EventEmitter, Injectable } from '@angular/core';
import { LocalStorageService } from '@ruanitto/ngx-local-storage';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { SettingsService } from 'src/app/shared/settings.service';
import { RouteInfo } from 'src/app/shared/models/RouteInfo';
import { Token } from 'src/app/shared/models/Token';
import { User } from 'src/app/shared/models/User';

interface IAuth {
  username: string,
  password: string
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  reloadPage = new EventEmitter();
  changedUser = new EventEmitter();
  permissionOfRoute = new EventEmitter();

  public user: User;
  public token: JSON;
  public refresh_token: string;
  public idSelectedUser: string;
  public modules: string[] = [];
  public idSelectedOrder: string;

  constructor(
    private _router: Router,
    private _http: HttpClient,
    private _settings: SettingsService,
    private _localStorageService: LocalStorageService,
  ) {
    this._localStorageService.setStorageType('sessionStorage');

    const resToken: any = this._localStorageService.get('sameday:token');
    this.token = JSON.parse(resToken) || null;
  }

  private extractData(res: HttpResponse<any>) {
    const body = res;
    return body || {};
  }

  private handleError(error: Error | HttpErrorResponse) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof HttpErrorResponse) {
      const err = error.error;
      err.status = err.status ? err.status : error.status;
      return Promise.reject(err);
    } else {
      errMsg = error.message ? error.message : error.toString();
      return Promise.reject(errMsg);
    }
  }

  public login(credential: IAuth): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options = { headers };

    const loginData = {
      username: credential.username,
      password: credential.password,
      platform: 'portal'
    };

    const url = this._settings.getEndPoint('v2') + '/auth/login';

    return this._http.post(url, loginData, options).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  private prepareLocalStorage(): void {
    this._localStorageService.setStorageType('sessionStorage');
  }

  private getKeyLocalStorage(keyName: string): any {
    this.prepareLocalStorage();

    const resLTK: any = this._localStorageService.get(keyName);
    return (JSON.parse(resLTK) || null);
  }

  public getToken(): JSON {
    this.token = this.getKeyLocalStorage('sameday:token');
    return this.token;
  }

  public setToken(_token: Token) {
    this._localStorageService.set('sameday:token', JSON.stringify(_token));
    this.token = this.getKeyLocalStorage('sameday:token');
  }

  public setRefreshToken(_refresh_token: string) {
    this._localStorageService.set('sameday:refresh_token', _refresh_token);
  }

  public getRefreshToken(): string {
    this.refresh_token = this._localStorageService.get('sameday:refresh_token');
    return this.refresh_token;
  }

  public setUser(user: User) {
    this._localStorageService.set('sameday:user', JSON.stringify(user));

    if (user) {
      this.notice(user);
    }
  }

  public getUser() {
    this.user = this.getKeyLocalStorage('sameday:user');
    return this.user;
  }

  public setIdSelectedUser(_idUser: string) {
    this._localStorageService.set('sameday:idSelectedUser', _idUser);
  }

  public getIdSelectedUser(): string {
    this.idSelectedUser = this.getKeyLocalStorage('sameday:idSelectedUser');
    return this.idSelectedUser;
  }

  public setIdSelectedOrder(_idOrder: string) {
    this._localStorageService.set('sameday:idSelectedOrder', _idOrder);
  }

  public getIdSelectedOrder(): string {
    this.idSelectedOrder = this.getKeyLocalStorage('sameday:idSelectedOrder');
    return this.idSelectedOrder;
  }

  public setModules(modules: RouteInfo[]) {
    this._localStorageService.set('sameday:modules', JSON.stringify(modules));
  }

  public getModules(): string[] {
    this.modules = this.getKeyLocalStorage('sameday:modules');
    return this.modules || [];
  }

  public authenticatedUser(): boolean {
    this.token = this.getToken();

    if (!this.token) {
      return false;
    }

    return true;
  }

  public notice(note) {
    this.changedUser.emit(note);
  }

  logoff() {
    this.permissionOfRoute.emit(true);
    this.prepareLocalStorage();
    this.token = null;
    this.user = null;
    this.modules = [];
    this.refresh_token = null;
    this.idSelectedUser = null;
    this.idSelectedOrder = null;
    document.title = 'Same Day';
    this._localStorageService.clearAll();
  }

  exit() {
    this.logoff();
    this.notice({ user: null });
    this._router.navigate(['/login']);
  }

  // Métodos para recuperação de senha
  public recoverPassword(email: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options = { headers };

    const url = this._settings.getEndPoint('v2') + '/recover_password';
    
    return this._http.post(url, { email }, options).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  public validateRecoveryCode(email: string, code: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options = { headers };

    const url = this._settings.getEndPoint('v2') + '/recover_password/code/validate';
    
    return this._http.post(url, { email, code }, options).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  public changePassword(email: string, code: string, newPassword: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options = { headers };

    const url = this._settings.getEndPoint('v2') + '/recover_password/change';
    
    return this._http.post(url, { email, code, newPassword }, options).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }
}