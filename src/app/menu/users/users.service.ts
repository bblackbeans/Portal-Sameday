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

  // Listar todos os usuários
  public getUsers() {
    const url = this._settings.getEndPoint('portal') + '/user/all';
    return this._http.get(url, null);
  }

  // Buscar usuário por ID
  public getUserById(id: string) {
    const url = this._settings.getEndPoint('portal') + '/user';
    return this._http.get(url, { idSelectedUser: id });
  }

  // Criar novo usuário
  public createUser(userData: any) {
    const url = this._settings.getEndPoint('v2') + '/user';
    return this._http.post(url, userData);
  }

  // Atualizar usuário
  public updateUser(userData: any) {
    const url = this._settings.getEndPoint('portal') + '/user';
    return this._http.put(url, userData);
  }

  // Deletar usuário
  public deleteUser(id: string) {
    // Endpoint correto conforme documentação da API
    const url = this._settings.getEndPoint('portal') + `/v2/user/${id}`;
    return this._http.delete(url);
  }

  // Ativar/Desativar usuário
  public toggleUserStatus(id: string, status: boolean) {
    const url = this._settings.getEndPoint('portal') + `/user/${id}/status`;
    return this._http.put(url, { active: status });
  }

  // Buscar usuário por CPF/CNPJ
  public getUserByDocument(document: string) {
    const url = this._settings.getEndPoint('v2') + '/user/document';
    return this._http.get(url, { document });
  }

  // Buscar usuário por email
  public getUserByEmail(email: string) {
    const url = this._settings.getEndPoint('v2') + '/user/email';
    return this._http.get(url, { email });
  }

  // Atualizar avatar do usuário
  public updateUserAvatar(userId: string, avatarFile: File) {
    const url = this._settings.getEndPoint('portal') + '/user/avatar';
    const formData = new FormData();
    formData.append('avatar', avatarFile);
    formData.append('idUser', userId);
    return this._http.put(url, formData);
  }

  // Validar motorista
  public validateDriver(validationData: any) {
    const url = this._settings.getEndPoint('portal') + '/user/driver/validate';
    return this._http.post(url, validationData);
  }
}