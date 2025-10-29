import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ForgotPasswordService } from '../forgot-password.service';
import { FunctionsService } from 'src/app/shared/functions.service';
import { ModalAlertService } from 'src/app/shared/modal-alert.service';
import { DynamicMessageService } from 'src/app/shared/dynamic-message.service';

interface IAuth {
  email: string  // Mudança: usar email ao invés de phone
}

@Component({
  selector: 'app-same-day-step1',
  templateUrl: './step1.component.html',
  styleUrls: ['./step1.component.scss']
})
export class Step1Component implements OnInit {

  public auth: IAuth = { email: '' };  // Mudança: usar email
  public loading: boolean = false;

  constructor(
    private _router: Router,
    private _functions: FunctionsService,
    private _modalAlertService: ModalAlertService,
    private _dynamicMessage: DynamicMessageService,
    private _forgotPasswordService: ForgotPasswordService
  ) { }

  ngOnInit(): void { }

  public step_1() {
    this.loading = true;
    this._forgotPasswordService.step_1(this.auth)
      .subscribe((x) => {
        if (x.status === 'success') {
          this._dynamicMessage.open(x.message);

          setTimeout(() => {
            this.loading = false;
            this.navigateTo('forgot-password/step-2')
          }, 200);
        } else if (x.status === 'error') {
          this.loading = false;
          this.msgError(x);
        }
      }, (err) => {
        this.loading = false;
        this.msgError(err);
      });
  }

  public isValid(): boolean {
    const { email } = this.auth;

    // Mudança: validar email ao invés de telefone
    if (this._functions.validateEmail(email)) {
      return true;
    }

    return false;
  }

  private msgError(err) {
    const msg = this._functions.treatsErrorMessage('', err);
    this._modalAlertService.alertModal('Ops!', msg);
  }

  public navigateTo(route?: string): void {
    this._router.navigate([route]);
  }

}