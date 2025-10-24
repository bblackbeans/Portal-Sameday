import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/shared/http.service';
import { SettingsService } from 'src/app/shared/settings.service';

@Injectable({
  providedIn: 'root'
})
export class DriverService {

  constructor(
    private _http: HttpService,
    private _settings: SettingsService,
  ) { }

  // Listar todos os motoristas
  public getDrivers() {
    const url = this._settings.getEndPoint('v2') + '/driver/all';
    return this._http.get(url, null);
  }

  // Buscar motorista por ID
  public getDriverById(id: string) {
    const url = this._settings.getEndPoint('v2') + `/driver/${id}`;
    return this._http.get(url, null);
  }

  // Criar novo motorista
  public createDriver(driverData: any) {
    const url = this._settings.getEndPoint('v2') + '/driver';
    return this._http.post(url, driverData);
  }

  // Atualizar motorista
  public updateDriver(id: string, driverData: any) {
    const url = this._settings.getEndPoint('v2') + `/driver/${id}`;
    return this._http.put(url, driverData);
  }

  // Deletar motorista
  public deleteDriver(id: string) {
    const url = this._settings.getEndPoint('v2') + `/driver/${id}`;
    return this._http.delete(url);
  }

  // Ativar/Desativar motorista
  public toggleDriverStatus(id: string, status: boolean) {
    const url = this._settings.getEndPoint('v2') + `/driver/${id}/status`;
    return this._http.put(url, { active: status });
  }

  // Buscar motorista por CPF/CNPJ
  public getDriverByDocument(document: string) {
    const url = this._settings.getEndPoint('v2') + '/driver/document';
    return this._http.get(url, { document });
  }

  // Buscar motorista por email
  public getDriverByEmail(email: string) {
    const url = this._settings.getEndPoint('v2') + '/driver/email';
    return this._http.get(url, { email });
  }

  // Obter histórico de entregas do motorista
  public getDriverHistory(id: string, params?: any) {
    const url = this._settings.getEndPoint('v2') + `/driver/${id}/history`;
    return this._http.get(url, params);
  }

  // Obter estatísticas do motorista
  public getDriverStats(id: string, period?: string) {
    const url = this._settings.getEndPoint('v2') + `/driver/${id}/stats`;
    return this._http.get(url, { period });
  }

  // Obter ranking de motoristas
  public getDriverRanking(period?: string) {
    const url = this._settings.getEndPoint('v2') + '/driver/ranking';
    return this._http.get(url, { period });
  }

  // Obter motoristas disponíveis
  public getAvailableDrivers(params?: any) {
    const url = this._settings.getEndPoint('v2') + '/driver/available';
    return this._http.get(url, params);
  }

  // Atribuir pedido ao motorista
  public assignOrderToDriver(orderId: string, driverId: string) {
    const url = this._settings.getEndPoint('v2') + `/order/${orderId}/assign`;
    return this._http.post(url, { driverId });
  }

  // Remover atribuição de pedido
  public unassignOrderFromDriver(orderId: string) {
    const url = this._settings.getEndPoint('v2') + `/order/${orderId}/unassign`;
    return this._http.post(url, null);
  }
}

