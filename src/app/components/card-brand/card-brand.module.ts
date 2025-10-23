import { CardBrandComponent } from './card-brand.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [ CardBrandComponent ],
  exports: [ CardBrandComponent ],
  imports: [
    CommonModule
  ]
})
export class CardBrandModule { }
