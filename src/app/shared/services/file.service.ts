import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/shared/http.service';
import { SettingsService } from 'src/app/shared/settings.service';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(
    private _http: HttpService,
    private _settings: SettingsService,
  ) { }

  // Upload de arquivo
  public uploadFile(file: File, params?: any) {
    const url = this._settings.getEndPoint('v2') + '/file/upload';
    
    const formData = new FormData();
    formData.append('file', file);
    
    if (params) {
      Object.keys(params).forEach(key => {
        formData.append(key, params[key]);
      });
    }

    return this._http.post(url, formData);
  }

  // Download de arquivo
  public downloadFile(fileId: string) {
    const url = this._settings.getEndPoint('v2') + `/file/download/${fileId}`;
    return this._http.get(url, null);
  }

  // Obter informações do arquivo
  public getFileInfo(fileId: string) {
    const url = this._settings.getEndPoint('v2') + `/file/info/${fileId}`;
    return this._http.get(url, null);
  }

  // Listar arquivos
  public getFiles(params?: any) {
    const url = this._settings.getEndPoint('v2') + '/file/list';
    return this._http.get(url, params);
  }

  // Deletar arquivo
  public deleteFile(fileId: string) {
    const url = this._settings.getEndPoint('v2') + `/file/${fileId}`;
    return this._http.delete(url);
  }

  // Upload de múltiplos arquivos
  public uploadMultipleFiles(files: File[], params?: any) {
    const url = this._settings.getEndPoint('v2') + '/file/upload-multiple';
    
    const formData = new FormData();
    files.forEach((file, index) => {
      formData.append(`files[${index}]`, file);
    });
    
    if (params) {
      Object.keys(params).forEach(key => {
        formData.append(key, params[key]);
      });
    }

    return this._http.post(url, formData);
  }

  // Obter URL pública do arquivo
  public getPublicUrl(fileId: string) {
    const url = this._settings.getEndPoint('v2') + `/file/public-url/${fileId}`;
    return this._http.get(url, null);
  }

  // Validar tipo de arquivo
  public validateFileType(file: File, allowedTypes: string[]) {
    return allowedTypes.includes(file.type);
  }

  // Validar tamanho do arquivo
  public validateFileSize(file: File, maxSizeInMB: number) {
    const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
    return file.size <= maxSizeInBytes;
  }
}

