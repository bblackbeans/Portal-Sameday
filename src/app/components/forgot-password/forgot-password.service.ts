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
    this.forgotPasswordPhone = params.phone;
    const url = this._settings.getEndPoint('v2') + '/recover_password';

    return this._http.post(url, params);
  }

  public step_2(params: any) {
    params.phone = this.forgotPasswordPhone;
    const url = this._settings.getEndPoint('v2') + '/recover_password/code/validate';

    return this._http.post(url, params);
  }

  public step_3(params: any) {
    params.phone = this.forgotPasswordPhone;
    const url = this._settings.getEndPoint('v2') + '/recover_password/change';

    return this._http.post(url, params);
  }

  public getForgotPasswordPhone() {
    return this.forgotPasswordPhone;
  }

}