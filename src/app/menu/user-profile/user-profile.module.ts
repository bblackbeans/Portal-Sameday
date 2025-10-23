import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { IdentificationModule } from 'src/app/components/identification/identification.module';
import { UserProfileRoutingModule } from './user-profile-routing.module';
import { UserProfileComponent } from './user-profile.component';
@NgModule({
  declarations: [
    UserProfileComponent
  ],
  exports: [
    UserProfileComponent
  ],
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    IdentificationModule,
    UserProfileRoutingModule,
  ]
})
export class UserProfileModule { }