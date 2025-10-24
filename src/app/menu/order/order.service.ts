import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/shared/http.service';
import { SettingsService } from 'src/app/shared/settings.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private _http: HttpService,
    private _settings: SettingsService,
  ) { }

  public getOrder(params) {
    const url = this._settings.getEndPoint('portal') + '/order';

    return this._http.get(url, params);
  }

  public getHistoric(type) {
    const url = this._settings.getEndPoint('portal') + '/order/historic';

    return this._http.get(url, { type: type });
  }

  public getOrders() {
    const url = this._settings.getEndPoint('portal') + '/order/all';

    return this._http.get(url, null);
  }

  public getOrderInfo(params) {
    const url = this._settings.getEndPoint('portal') + '/order/view';

    return this._http.get(url, params);
  }

  public newOrder(params) {
    const url = this._settings.getEndPoint('portal') + '/order';

    return this._http.post(url, params);
  }

  public putOrder(params) {
    const url = this._settings.getEndPoint('portal') + '/order';

    return this._http.put(url, params);
  }

  public deleteOrder(idOrder) {
    const url = this._settings.getEndPoint('portal') + '/order/' + idOrder;

    return this._http.delete(url, null);
  }

  public getZipCode(zipCode: string) {
    const url = this._settings.getEndPoint('v2') + '/zip_code';

    return this._http.get(url, { zipCode });
  }

  public getLatLngThroughAddress(address: any) {
    const url = this._settings.getEndPoint('v2') + '/address/lat_lng';

    return this._http.get(url, address);
  }

  public getOrderValue(weight:number, distance:number) {
    const url = this._settings.getEndPoint('portal') + `/order/value?distance=${distance}&weight=${weight}`;
    return this._http.get(url);
  }

  public sendOrderInvoice(idOrder, method, tokenCredit?) {
    const url = this._settings.getEndPoint('portal') + `/order/${idOrder}/invoice`;
    return this._http.post(url, { paymentMethod: method, tokenCredit: tokenCredit });
  }

  public refundOrder(idOrder) {
    const url = this._settings.getEndPoint('portal') + `/order/${idOrder}/refund`;

    return this._http.post(url, null);
  }

}