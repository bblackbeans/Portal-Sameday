import { Injectable } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { BehaviorSubject } from 'rxjs';

export class ProgressSpinnerConfig {
  color?: ThemePalette;
  diameter?: number;
  mode?: ProgressSpinnerMode;
  strokeWidth?: number;
  value?: number;
  backdropEnabled?: boolean;
  positionGloballyCenter?: boolean;
  displayText?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProgressSpinnerService {

  private spinner_status: BehaviorSubject<ProgressSpinnerConfig | boolean> = new BehaviorSubject(false);
  constructor() { }

  public status() {
    return this.spinner_status;
  }

  public start(config?: ProgressSpinnerConfig, timeout?: number) {
    if (config) {
      this.spinner_status.next(config);
    } else {
      this.spinner_status.next(true);
    }

    if (timeout) {
      setTimeout(() => {
        this.stop();
      }, timeout);
    }
  }

  public stop() {
    this.spinner_status.next(false);
  }
}