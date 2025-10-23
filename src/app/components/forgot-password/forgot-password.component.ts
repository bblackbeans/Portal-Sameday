import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { SettingsService } from 'src/app/shared/settings.service';
import { LoginService } from '../login/login.service';

declare const $: any;

@Component({
  selector: 'app-same-day-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  public fullYear: number;
  public loginVersion: string;

  constructor(
    private _router: Router,
    private _settings: SettingsService,
    private _loginService: LoginService
  ) { }

  ngOnInit(): void {
    this.fullYear = moment().year();
    const modules = this._loginService.getModules();

    if (this._loginService.authenticatedUser() && modules.length) {
      $('body').removeClass('authentication');
      this._router.navigate([modules[0]['path']]);
    }

    $('body').addClass('authentication');

    setTimeout(() => {
      this.loginVersion = this._settings.settings.appVersion;
    }, 500);
  }

  public checkURL() {
    if (this._router.url === '/forgot-password/step-3') {
      $('#forgotPassword').removeClass('forgotPassword');
      $('#forgotPassword').addClass('forgotPasswordStep_3');
    } else {
      $('#forgotPassword').removeClass('forgotPasswordStep_3');
    }
  }

  public navigateTo(route?: string): void {
    this._router.navigate([route]);
  }

}