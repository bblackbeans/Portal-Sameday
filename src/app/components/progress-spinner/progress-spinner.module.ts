import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressSpinnerComponent } from './progress-spinner.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { OverlayModule } from '@angular/cdk/overlay';

@NgModule({
  declarations: [
    ProgressSpinnerComponent
  ],
  exports: [
    ProgressSpinnerComponent
  ],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    OverlayModule
  ],
})
export class ProgressSpinnerModule { }