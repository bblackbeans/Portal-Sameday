import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { ModalAlertService } from 'src/app/shared/modal-alert.service';
import { FunctionsService } from 'src/app/shared/functions.service';
import { SettingsService } from 'src/app/shared/settings.service';
import { RouteInfo } from 'src/app/shared/models/RouteInfo';
import { LoginService } from './login.service';

declare const $: any;

interface IAuth {
  username: string,
  password: string
}

@Component({
  selector: 'app-same-day-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public auth: IAuth = { username: '', password: '' };
  public fullYear: number;
  public loginVersion: string;
  public loading: boolean = false;
  public showPassword: boolean = false;

  public modulesDriver: RouteInfo[] = [
    { path: '/user-profile', title: 'Identificação', icon: 'person', class: '', code: 'user-profile' },
    { path: '/financial', title: 'Financeiro', icon: 'account_balance', class: '', code: 'financial', 
      children: [
        { path: '/financial/driver-invoice', title: 'Relatório Geral', icon: 'trending_up', class: '', code: 'financial' },
        { path: '/financial/driver-payment', title: 'Pagamentos', icon: 'monetization_on', class: '', code: 'financial' },
        { path: '/financial/driver-account', title: 'Info. de pagamento', icon: 'leaderboard', class: '', code: 'financial' },
      ]
    },
  ];

  public modulesCustomer: RouteInfo[] = [
    { path: '/user-profile', title: 'Identificação', icon: 'person', class: '', code: 'user-profile' },
    { path: '/order', title: 'Pedidos', icon: 'assignment', class: '', code: 'order' },
    { path: '/order/list', title: 'Pedidos', icon: 'assignment', class: '', code: '' },
    { path: '/order/new', title: 'Novo Pedido', icon: 'assignment', class: '', code: '' },
    { path: '/order/edit', title: 'Editar Pedido', icon: 'assignment', class: '', code: '' },
    { path: '/order/view', title: 'Visualizar Pedido', icon: 'assignment', class: '', code: '' },
  ];

  public modulesAdministrator: RouteInfo[] = [
    { path: '/users', title: 'Todos Usuários', icon: 'supervisor_account', class: '', code: 'users' },
    { path: '/users/list', title: 'Todos Usuários', icon: 'supervisor_account', class: '', code: '' },
    { path: '/users/new', title: 'Novo Usuário', icon: 'supervisor_account', class: '', code: '' },
    { path: '/users/edit', title: 'Editar Usuário', icon: 'supervisor_account', class: '', code: '' },
    { path: '/users/driver/validate', title: 'Validar Motorista', icon: 'supervisor_account', class: '', code: '' },
    { path: '/user-profile', title: 'Identificação', icon: 'person', class: '', code: 'user-profile' },
    { path: '/dashboard', title: 'Dashboard', icon: 'dashboard', class: '', code: 'dashboard' },
    { path: '/order', title: 'Pedidos', icon: 'assignment', class: '', code: 'order' },
    { path: '/order/list', title: 'Pedidos', icon: 'assignment', class: '', code: '' },
    { path: '/order/new', title: 'Novo Pedido', icon: 'assignment', class: '', code: '' },
    { path: '/order/edit', title: 'Editar Pedido', icon: 'assignment', class: '', code: '' },
    { path: '/order/view', title: 'Visualizar Pedido', icon: 'assignment', class: '', code: '' },
    { path: '/financial', title: 'Financeiro', icon: 'account_balance', class: '', code: 'financial', 
      children: [
        { path: '/financial/admin-invoice', title: 'Pagamentos', icon: 'monetization_on', class: '', code: 'financial' },
        { path: '/financial/resume', title: 'Relatório Geral', icon: 'trending_up', class: '', code: 'financial' },
        { path: '/financial/driver-ranking', title: 'Ranking dos Motoristas', icon: 'leaderboard', class: '', code: 'financial' },
      ]
    },
  ];

  constructor(
    private _router: Router,
    private _settings: SettingsService,
    private _loginService: LoginService,
    private _functions: FunctionsService,
    private _modalAlertService: ModalAlertService,
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

  onSubmit(): void {
    this.loading = true;
    this._loginService.login(this.auth)
      .subscribe((x) => {
        if (x.status === 'success') {
          const { token, user } = x;

          switch (user.profile) {
            case 'driver':
              this._loginService.setModules(this.modulesDriver);
              break;
            case 'client':
              this._loginService.setModules(this.modulesCustomer);
              break;
            case 'administrator':
              this._loginService.setModules(this.modulesAdministrator);
              break;
          }

          setTimeout(() => {
            const modules = this._loginService.getModules();

            if (modules.length) {
              $('body').removeClass('authentication');
              this._loginService.setUser(user);
              this._loginService.setToken(token);
              this._router.navigate([modules[0]['path']]);
              this.loading = false;
            } else {
              this._modalAlertService.alertModal('Ops!', 'Tipo de usuário não possui módulo definido, por favor informe ao suporte Same Day!');
              this.loading = false;
              return false;
            }
          }, 500);
        }
      }, (err) => {
        this.loading = false;
        this.msgError(err);
      });
  }

  isValid(): boolean {
    const { username, password } = this.auth;

    if (username && password) {
      return true;
    }

    return false;
  }

  private msgError(err) {
    const msg = this._functions.treatsErrorMessage('', err);
    this._modalAlertService.alertModal('Ops!', msg);
  }

  navigateTo(route?: string): void {
    this._router.navigate([route]);
  }
}