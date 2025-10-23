import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register.component';
import { RegisterRoutingModule } from './register-routing.module';
import { IdentificationModule } from 'src/app/components/identification/identification.module';
@NgModule({
  declarations: [
    RegisterComponent
  ],
  exports: [
    RegisterComponent
  ],
  imports: [
    CommonModule,
    IdentificationModule,
    RegisterRoutingModule
  ]
})
export class RegisterModule { }