import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/shared/http.service';
import { SettingsService } from 'src/app/shared/settings.service';

@Injectable({
  providedIn: 'root'
})
export class PartnersService {

  constructor(
    private _http: HttpService,
    private _settings: SettingsService,
  ) { }

  // ===== EMBARCADORES =====

  // Listar embarcadores
  public getShippers(params?: any) {
    const url = this._settings.getEndPoint('portal') + '/partners/shippers';
    return this._http.get(url, params);
  }

  // Ver embarcador específico
  public getShipperById(id: string) {
    const url = this._settings.getEndPoint('portal') + `/partners/shippers/${id}`;
    return this._http.get(url, null);
  }

  // Atualizar embarcador
  public updateShipper(id: string, shipperData: any) {
    const url = this._settings.getEndPoint('portal') + `/partners/shippers/${id}`;
    return this._http.put(url, shipperData);
  }

  // Atualizar status do embarcador
  public updateShipperStatus(id: string, status: string) {
    const url = this._settings.getEndPoint('portal') + `/partners/shippers/${id}/status`;
    return this._http.put(url, { status });
  }

  // Deletar embarcador
  public deleteShipper(id: string) {
    const url = this._settings.getEndPoint('portal') + `/partners/shippers/${id}`;
    return this._http.delete(url);
  }

  // ===== TRANSPORTADORES =====

  // Listar transportadores
  public getCarriers(params?: any) {
    const url = this._settings.getEndPoint('portal') + '/partners/carriers';
    return this._http.get(url, params);
  }

  // Ver transportador específico
  public getCarrierById(id: string) {
    const url = this._settings.getEndPoint('portal') + `/partners/carriers/${id}`;
    return this._http.get(url, null);
  }

  // Atualizar transportador
  public updateCarrier(id: string, carrierData: any) {
    const url = this._settings.getEndPoint('portal') + `/partners/carriers/${id}`;
    return this._http.put(url, carrierData);
  }

  // Atualizar status do transportador
  public updateCarrierStatus(id: string, status: string) {
    const url = this._settings.getEndPoint('portal') + `/partners/carriers/${id}/status`;
    return this._http.put(url, { status });
  }

  // Deletar transportador
  public deleteCarrier(id: string) {
    const url = this._settings.getEndPoint('portal') + `/partners/carriers/${id}`;
    return this._http.delete(url);
  }

  // ===== STOCK STORE =====

  // Listar parceiros stock store
  public getStockStores(params?: any) {
    const url = this._settings.getEndPoint('portal') + '/partners/stock-store';
    return this._http.get(url, params);
  }

  // Ver parceiro stock store específico
  public getStockStoreById(id: string) {
    const url = this._settings.getEndPoint('portal') + `/partners/stock-store/${id}`;
    return this._http.get(url, null);
  }

  // Atualizar parceiro stock store
  public updateStockStore(id: string, stockStoreData: any) {
    const url = this._settings.getEndPoint('portal') + `/partners/stock-store/${id}`;
    return this._http.put(url, stockStoreData);
  }

  // Atualizar status do parceiro
  public updateStockStoreStatus(id: string, status: string) {
    const url = this._settings.getEndPoint('portal') + `/partners/stock-store/${id}/status`;
    return this._http.put(url, { status });
  }

  // Deletar parceiro stock store
  public deleteStockStore(id: string) {
    const url = this._settings.getEndPoint('portal') + `/partners/stock-store/${id}`;
    return this._http.delete(url);
  }

  // ===== CONTATOS =====

  // Listar contatos
  public getContacts(params?: any) {
    const url = this._settings.getEndPoint('portal') + '/partners/contacts';
    return this._http.get(url, params);
  }

  // Ver contato específico
  public getContactById(id: string) {
    const url = this._settings.getEndPoint('portal') + `/partners/contacts/${id}`;
    return this._http.get(url, null);
  }

  // Atualizar contato
  public updateContact(id: string, contactData: any) {
    const url = this._settings.getEndPoint('portal') + `/partners/contacts/${id}`;
    return this._http.put(url, contactData);
  }

  // Atualizar status do contato
  public updateContactStatus(id: string, status: string) {
    const url = this._settings.getEndPoint('portal') + `/partners/contacts/${id}/status`;
    return this._http.put(url, { status });
  }

  // Deletar contato
  public deleteContact(id: string) {
    const url = this._settings.getEndPoint('portal') + `/partners/contacts/${id}`;
    return this._http.delete(url);
  }

  // ===== DASHBOARD DE PARCEIROS =====

  // Estatísticas de parceiros
  public getPartnersStats() {
    const url = this._settings.getEndPoint('portal') + '/partners/dashboard/stats';
    return this._http.get(url, null);
  }

  // Atividades recentes
  public getRecentActivities(limit?: number) {
    const url = this._settings.getEndPoint('portal') + '/partners/dashboard/recent';
    return this._http.get(url, { limit });
  }

  // Exportar dados
  public exportPartnersData(type: string) {
    const url = this._settings.getEndPoint('portal') + `/partners/dashboard/export/${type}`;
    return this._http.get(url, null);
  }

  // ===== CADASTROS PÚBLICOS =====

  // Cadastrar embarcador (público)
  public registerShipper(shipperData: any) {
    const url = this._settings.getEndPoint('v2') + '/partners/shippers';
    return this._http.post(url, shipperData);
  }

  // Cadastrar transportador (público)
  public registerCarrier(carrierData: any) {
    const url = this._settings.getEndPoint('v2') + '/partners/carriers';
    return this._http.post(url, carrierData);
  }

  // Cadastrar parceiro stock store (público)
  public registerStockStore(stockStoreData: any) {
    const url = this._settings.getEndPoint('v2') + '/partners/stock-store';
    return this._http.post(url, stockStoreData);
  }

  // Enviar contato (público)
  public sendContact(contactData: any) {
    const url = this._settings.getEndPoint('v2') + '/partners/contacts';
    return this._http.post(url, contactData);
  }
}
