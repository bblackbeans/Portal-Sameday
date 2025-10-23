import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { DriverDetailsComponent } from './driver-details.component';
import { MatIconModule } from '@angular/material/icon';
import { PipesModule } from 'src/app/shared/application/pipes/pipes.module';


@NgModule({
  declarations: [
    DriverDetailsComponent
  ],
  exports: [
    DriverDetailsComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    PipesModule
  ]
})
export class DriverDetailsModule { }