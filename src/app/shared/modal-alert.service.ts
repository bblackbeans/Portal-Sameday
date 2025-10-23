import { Injectable, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalAlertComponent } from '../components/modal-alert/modal-alert.component';

@Injectable()
export class ModalAlertService {

  alertEvent = new EventEmitter();
  returnEvent = new EventEmitter();
  /*alertmodal*/
  error = false;
  errorTitle = '';
  errorMessage = '';
  errorAction: any;

  constructor(public dialog: MatDialog) { }

  /**
   * Emite um pop-up de alerta no sistema
   */
  public alertModal(title: string, message: string, buttons?: string, action?: string, value?: string | number, disableClose = true): void {

    this.errorTitle = title || null;
    this.errorMessage = message || null;
    this.errorAction = {
      button: buttons ? buttons : 'close',
      action: action || null,
      value: (typeof value === 'number' || typeof value === 'string') ? (value).toString() : null
    };

    const modalAlert = this.dialog.open(ModalAlertComponent, {
      maxWidth: '600px',
      disableClose,
      data: {
        tipo: 'alert',
        title: this.errorTitle,
        message: this.errorMessage,
        actions: this.errorAction,
        name: 'modalAlert'
      }
    });

    modalAlert.afterClosed().subscribe(returnAlert => {
      if (returnAlert) {
        this.returnEvent.emit(returnAlert);
      }
    });
  }
}