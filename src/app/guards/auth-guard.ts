import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { LoginService } from '../components/login/login.service';

declare const $: any;

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private _router: Router,
    private _loginService: LoginService,
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {

    const snapUrl = state.url;
    const path = route.routeConfig.path;

    $(window).trigger('click');

    if (this._loginService.authenticatedUser()) {
      const modules = this._loginService.getModules();

      if (path && modules.length) {
        const access = modules.filter(item => String('/' + item['code']) === String('/' + path));

        if (access.length <= 0) {
          this._loginService.permissionOfRoute.emit({
            access: false,
            snapUrl
          });

          this._router.navigate(['404']);
          return false;
        }
      }

      this._loginService.permissionOfRoute.emit(true);
      return true;
    }

    this._loginService.permissionOfRoute.emit(true);
    this._router.navigate(['/login']);
    return false;
  }

}