import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/shared/http.service';
import { SettingsService } from 'src/app/shared/settings.service';

@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordService {

  public forgotPasswordPhone = null;

  constructor(
    private _http: HttpService,
    private _settings: SettingsService
  ) { }

  public step_1(params: any) {
    // Mudança: usar email ao invés de telefone
    // Se params contém phone, usar email
    const email = params.email || params.phone;
    this.forgotPasswordPhone = email; // Manter nome da variável por compatibilidade
    
    const url = this._settings.getEndPoint('v2') + '/recover_password';
    
    // Enviar email ao invés de phone
    const requestParams = { email: email };

    return this._http.post(url, requestParams);
  }

  public step_2(params: any) {
    // Usar email ao invés de phone
    const email = this.forgotPasswordPhone;
    const url = this._settings.getEndPoint('v2') + '/recover_password/code/validate';
    
    const requestParams = {
      email: email,
      code: params.code || params
    };

    return this._http.post(url, requestParams);
  }

  public step_3(params: any) {
    // Usar email ao invés de phone
    const email = this.forgotPasswordPhone;
    const url = this._settings.getEndPoint('v2') + '/recover_password/change';
    
    const requestParams = {
      email: email,
      password: params.password || params.newPassword,
      passwordAgain: params.passwordAgain || params.confirmPassword,
      code: params.code
    };

    return this._http.post(url, requestParams);
  }

  public getForgotPasswordPhone() {
    return this.forgotPasswordPhone;
  }

}