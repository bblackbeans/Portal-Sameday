import { Inject, Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { version } from '../../../package.json';
import { WINDOW } from './window.service';

@Injectable()
export class SettingsService {

  settings: any = {
    appVersion: version,
  }

  constructor(@Inject(WINDOW) private window: Window) { }

  public getHostname(): string {
    return this.window.location.hostname;
  }

  public getOrigin(): string {
    return this.window.location.origin;
  }

  public getLocale(): string {
    return 'pt-BR';
  }

  public getSettings(sett): string {
    return this.settings[sett];
  }

  public getEndPoint(parameter?: string): string {
    const endpointV2 = environment.endpoint;
    let setUrl = '';

    switch (parameter) {
      case 'portal':
        setUrl = `${endpointV2}/${parameter}/v2`;
        break;
      case 'v2':
        setUrl = `${endpointV2}/${parameter}`;
        break;
    }

    return setUrl;
  }

  public getAppVersion(): string {
    return this.settings.appVersion;
  }

}