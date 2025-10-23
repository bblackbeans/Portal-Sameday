import { EventEmitter, Injectable } from '@angular/core';
import { HttpService } from 'src/app/shared/http.service';
import { SettingsService } from 'src/app/shared/settings.service';

@Injectable({
  providedIn: 'root'
})
export class AttachFileService {

  public fileLoading_cnhPhoto = new EventEmitter();
  public fileLoading_driverPhoto = new EventEmitter();
  public fileLoading_vehiclePhoto = new EventEmitter();
  public fileLoading_profilePicture = new EventEmitter();
  public fileLoading_antecedentPhoto = new EventEmitter();
  public fileLoading_documentPhotoCRLV = new EventEmitter();
  public fileLoading_photoOfProofOfAddress = new EventEmitter();
  
  constructor(
    private _http: HttpService,
    private _settings: SettingsService
  ) { }

  public docUpload(params: any) {
    const url = this._settings.getEndPoint('v2') + '/upload';

    return this._http.post(url, params);
  }

  public docDestroy(params: any) {
    const url = this._settings.getEndPoint('v2') + '/destroy';

    return this._http.post(url, params);
  }

  public putProfilePicture(params: any) {
    const url = this._settings.getEndPoint('portal') + '/user/avatar';

    return this._http.put(url, params);
  }

}