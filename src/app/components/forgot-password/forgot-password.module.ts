import { NgModule } from '@angular/core';
import { NgxMaskModule } from 'ngx-mask';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPasswordStrengthModule } from '@angular-material-extensions/password-strength';
import { ForgotPasswordRoutingModule } from './forgot-password-routing.module';
import { ForgotPasswordComponent } from './forgot-password.component';
import { Step1Component } from './step1/step1.component';
import { Step2Component } from './step2/step2.component';
import { Step3Component } from './step3/step3.component';

@NgModule({
  declarations: [
    Step1Component,
    Step2Component,
    Step3Component,
    ForgotPasswordComponent
  ],
  exports: [
    Step1Component,
    Step2Component,
    Step3Component,
    ForgotPasswordComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatSlideToggleModule,
    NgxMaskModule.forRoot(),
    MatProgressSpinnerModule,
    MatPasswordStrengthModule,
    ForgotPasswordRoutingModule
  ]
})
export class ForgotPasswordModule { }