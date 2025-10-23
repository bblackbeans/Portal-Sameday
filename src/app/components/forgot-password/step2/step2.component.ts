import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ForgotPasswordService } from '../forgot-password.service';
import { FunctionsService } from 'src/app/shared/functions.service';
import { ModalAlertService } from 'src/app/shared/modal-alert.service';
import { DynamicMessageService } from 'src/app/shared/dynamic-message.service';

interface IAuth {
  phone: string,
  code: string,
}

@Component({
  selector: 'app-same-day-step2',
  templateUrl: './step2.component.html',
  styleUrls: ['./step2.component.scss']
})
export class Step2Component implements OnInit {

  public auth: IAuth = { phone: '', code: '' };
  public loading: boolean = false;

  constructor(
    private _router: Router,
    private _functions: FunctionsService,
    private _modalAlertService: ModalAlertService,
    private _dynamicMessage: DynamicMessageService,
    private _forgotPasswordService: ForgotPasswordService
  ) { }

  ngOnInit(): void {
    if (!this._forgotPasswordService.getForgotPasswordPhone()) {
      this.navigateTo('login')
    }
  }

  public step_2() {
    this.loading = true;
    this._forgotPasswordService.step_2(this.auth)
      .subscribe((x) => {
        if (x.status === 'success') {
          this._dynamicMessage.open(x.message);

          setTimeout(() => {
            this.loading = false;
            this.navigateTo('forgot-password/step-3')
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
    const { code } = this.auth;

    if (code && code.length === 6) {
      return true;
    }

    return false;
  }

  private msgError(err: any) {
    const msg = this._functions.treatsErrorMessage('', err);
    this._modalAlertService.alertModal('Ops!', msg);
  }

  public navigateTo(route?: string): void {
    this._router.navigate([route]);
  }

}