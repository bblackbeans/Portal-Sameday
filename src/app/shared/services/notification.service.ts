import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/shared/http.service';
import { SettingsService } from 'src/app/shared/settings.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(
    private _http: HttpService,
    private _settings: SettingsService,
  ) { }

  // Listar todas as notificações
  public getNotifications() {
    const url = this._settings.getEndPoint('v2') + '/notification/all';
    return this._http.get(url, null);
  }

  // Buscar notificação por ID
  public getNotificationById(id: string) {
    const url = this._settings.getEndPoint('v2') + `/notification/${id}`;
    return this._http.get(url, null);
  }

  // Criar nova notificação
  public createNotification(notificationData: any) {
    const url = this._settings.getEndPoint('v2') + '/notification';
    return this._http.post(url, notificationData);
  }

  // Atualizar notificação
  public updateNotification(id: string, notificationData: any) {
    const url = this._settings.getEndPoint('v2') + `/notification/${id}`;
    return this._http.put(url, notificationData);
  }

  // Deletar notificação
  public deleteNotification(id: string) {
    const url = this._settings.getEndPoint('v2') + `/notification/${id}`;
    return this._http.delete(url);
  }

  // Marcar notificação como lida
  public markAsRead(id: string) {
    const url = this._settings.getEndPoint('v2') + `/notification/${id}/read`;
    return this._http.put(url, null);
  }

  // Marcar todas as notificações como lidas
  public markAllAsRead() {
    const url = this._settings.getEndPoint('v2') + '/notification/read-all';
    return this._http.put(url, null);
  }

  // Obter notificações não lidas
  public getUnreadNotifications() {
    const url = this._settings.getEndPoint('v2') + '/notification/unread';
    return this._http.get(url, null);
  }

  // Obter contador de notificações não lidas
  public getUnreadCount() {
    const url = this._settings.getEndPoint('v2') + '/notification/unread-count';
    return this._http.get(url, null);
  }

  // Enviar notificação para usuário específico
  public sendToUser(userId: string, notificationData: any) {
    const url = this._settings.getEndPoint('v2') + `/notification/send/user/${userId}`;
    return this._http.post(url, notificationData);
  }

  // Enviar notificação para todos os usuários
  public sendToAll(notificationData: any) {
    const url = this._settings.getEndPoint('v2') + '/notification/send/all';
    return this._http.post(url, notificationData);
  }

  // Enviar notificação para motoristas
  public sendToDrivers(notificationData: any) {
    const url = this._settings.getEndPoint('v2') + '/notification/send/drivers';
    return this._http.post(url, notificationData);
  }

  // Enviar notificação para clientes
  public sendToClients(notificationData: any) {
    const url = this._settings.getEndPoint('v2') + '/notification/send/clients';
    return this._http.post(url, notificationData);
  }
}

