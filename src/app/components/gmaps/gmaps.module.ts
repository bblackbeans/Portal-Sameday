import { GmapsComponent } from './gmaps.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [ GmapsComponent ],
  exports: [ GmapsComponent ],
  imports: [
    CommonModule
  ]
})
export class GmapsModule { }
