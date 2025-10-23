import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/shared/http.service';
import { SettingsService } from 'src/app/shared/settings.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private _http: HttpService,
    private _settings: SettingsService,
  ) { }

  public getUsers() {
    const url = this._settings.getEndPoint('portal') + '/user/all';

    return this._http.get(url, null);
  }
}