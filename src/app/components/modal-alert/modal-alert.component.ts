import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-modal-alert',
  templateUrl: './modal-alert.component.html',
  styleUrls: ['./modal-alert.component.scss']
})
export class ModalAlertComponent implements OnInit {

  public name = '';
  public title = 'Ops!';
  public message = '';
  public actions: any;
  public reason = null;
  public triggered: any = 'component';

  constructor(
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<ModalAlertComponent>,
  ) {
    this.title = this.data.title;
    this.message = this.data.message;
    this.actions = this.data.actions;
    this.dialogRef.disableClose = true;
    this.triggered = this.data.triggered || 'service';
  }

  ngOnInit() { }

  public performTheAction(event, action, value?): any {
    if (event === 'yes' && (action.action === 'reproved' || action.action === 'revision') && !this.reason) {
      this.dialog.open(ModalAlertComponent, {
        maxWidth: '600px',
        data: {
          title: 'Ops!',
          message: 'Por favor preencha o campo motivo!',
          actions: { button: 'close', action: action || null, value: null },
          name: 'modalAlert'
        }
      });
    } else if (this.triggered === 'component') {
      this.dialogRef.close({ event, action });
    } else if (this.triggered === 'service') {
      this.dialogRef.close({ event, action, value, reason: this.reason });
    }
  }

}