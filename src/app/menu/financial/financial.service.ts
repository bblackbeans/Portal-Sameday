import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/shared/http.service';
import { SettingsService } from 'src/app/shared/settings.service';

@Injectable({
  providedIn: 'root'
})
export class FinancialService {

  constructor(
    private _http: HttpService,
    private _settings: SettingsService,
  ) { }

  public getDriverResume(monthRef) {
    const url = this._settings.getEndPoint('portal') + '/financial/driver-resume?monthReference=' + monthRef;

    return this._http.get(url, null);
  }

  public getDriverPayment(monthRef) {
    const url = this._settings.getEndPoint('portal') + '/financial/driver-payment?monthReference=' + monthRef;

    return this._http.get(url, null);
  }

  public getResume(monthRef) {
    const url = this._settings.getEndPoint('portal') + '/financial/resume?monthReference=' + monthRef;

    return this._http.get(url, null);
  }

  public getDriverRanking(monthRef) {
    const url = this._settings.getEndPoint('portal') + '/financial/driver-ranking?monthReference=' + monthRef;

    return this._http.get(url, null);
  }

  public getAdminInvoice(monthRef) {
    const url = this._settings.getEndPoint('portal') + '/financial/admin-invoice?monthReference=' + monthRef;

    return this._http.get(url, null);
  }
  
  getMonthStr(val) {
    let strReturn = "";
    switch (val) {
      case 0:
        strReturn = "Janeiro";
        break;    
      case 1:
        strReturn = "Fevereiro";
        break;    
      case 2:
        strReturn = "Março";
        break;    
      case 3:
        strReturn = "Abril";
        break;    
      case 4:
        strReturn = "Maio";
        break;    
      case 5:
        strReturn = "Junho";
        break;    
      case 6:
        strReturn = "Julho";
        break;    
      case 7:
        strReturn = "Agosto";
        break;    
      case 8:
        strReturn = "Setembro";
        break;    
      case 9:
        strReturn = "Outubro";
        break;    
      case 10:
        strReturn = "Novembro";
        break;    
      case 11:
        strReturn = "Dezembro";
        break;    
      default:
        break;
    }

    return strReturn;
  }
  
  padStr(val, size = 2, character = '0'){
    var s = String(val);
    while (s.length < (size || 2)) {s = character + s;}
    return s;
  }
}