import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ForgotPasswordService } from '../forgot-password.service';
import { FunctionsService } from 'src/app/shared/functions.service';
import { ModalAlertService } from 'src/app/shared/modal-alert.service';
import { DynamicMessageService } from 'src/app/shared/dynamic-message.service';

interface IAuth {
  phone: string,
  password: string,
  passwordAgain: string
}

@Component({
  selector: 'app-same-day-step3',
  templateUrl: './step3.component.html',
  styleUrls: ['./step3.component.scss']
})
export class Step3Component implements OnInit {

  public auth: IAuth = { phone: '', password: '', passwordAgain: '' };
  public loading: boolean = false;

  // Password
  public hide1: boolean = false;
  public hide2: boolean = false;
  public checkStrongBar: number = 0;
  public pattern = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%&*()]).{6,}/;

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

  public onStrengthChanged(strength: number) {
    this.checkStrongBar = strength;
  }

  public sequenceCheck(value: string) {
    if (!value) {
      this.checkStrongBar = 0;
    } else {
      if (value.length > 2) {
        const seq = ['012', '123', '234', '345', '456', '567', '678', '789'];

        seq.forEach(s => {
          if (value.indexOf(s) > -1) {
            this._modalAlertService.alertModal('Ops!', 'Senha não pode conter sequência numérica, com mais de 2 dígitos!');
          }
        });
      }
    }
  }

  public step_3() {
    if (this.auth.password && this.auth.password !== this.auth.passwordAgain) {
      this._modalAlertService.alertModal('Ops!', 'Por favor repita a mesma senha nos dois campos!');
      return false;

    } else {
      this.loading = true;
      this._forgotPasswordService.step_3(this.auth)
        .subscribe((x) => {
          if (x.status === 'success') {
            this._dynamicMessage.open(x.message);

            setTimeout(() => {
              this.loading = false;
              this.navigateTo('login')
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
  }

  public isValid(): boolean {
    const { password } = this.auth;

    if (this._functions.validateStrongPassword(password)) {
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
