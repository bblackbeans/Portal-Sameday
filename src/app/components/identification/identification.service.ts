import { Injectable } from '@angular/core';
import { SettingsService } from 'src/app/shared/settings.service';
import { HttpService } from 'src/app/shared/http.service';

@Injectable({
  providedIn: 'root'
})
export class IdentificationService {

  public token: JSON;
  public typeUser: string;
  public modules: string[] = [];
  public refresh_token: string;

  constructor(
    private _http: HttpService,
    private _settings: SettingsService
  ) { }

  public validDoc(params: any) {
    const url = this._settings.getEndPoint('portal') + '/user/driver/validate';

    return this._http.post(url, params);
  }

  public insertUser(params: any) {
    const url = this._settings.getEndPoint('v2') + '/user';

    return this._http.post(url, params);
  }

  public updateUser(params: any) {
    const url = this._settings.getEndPoint('portal') + '/user';

    return this._http.put(url, params);
  }

  public getProfile(params?: any) {
    const url = this._settings.getEndPoint('portal') + '/user';

    return this._http.get(url, params);
  }

  public getZipCode(zipCode: string) {
    const url = this._settings.getEndPoint('v2') + '/zipe_code';

    return this._http.get(url, { zipCode });
  }

}