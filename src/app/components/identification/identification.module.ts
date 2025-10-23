import { NgModule } from '@angular/core';
import { NgxMaskModule } from 'ngx-mask';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPasswordStrengthModule } from '@angular-material-extensions/password-strength';
import { AttachFileModule } from 'src/app/components/attach-file/attach-file.module';
import { IdentificationComponent } from './identification.component';

@NgModule({
  declarations: [
    IdentificationComponent
  ],
  exports: [
    IdentificationComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    AttachFileModule,
    MatTooltipModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatSlideToggleModule,
    NgxMaskModule.forRoot(),
    MatProgressSpinnerModule,
    MatPasswordStrengthModule
  ]
})
export class IdentificationModule { }