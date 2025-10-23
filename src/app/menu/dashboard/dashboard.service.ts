import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/shared/http.service';
import { SettingsService } from 'src/app/shared/settings.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  constructor(
    private _http: HttpService,
    private _settings: SettingsService,
  ) { }

  public getDashboardData() {
    const url = this._settings.getEndPoint('portal') + '/dashboard/data';

    return this._http.get(url, null);
  }

  public getDashboardGraphics(params: any) {
    const url = this._settings.getEndPoint('portal') + '/dashboard/graphics';

    return this._http.get(url, params);
  }
}