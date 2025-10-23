import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { IdentificationModule } from 'src/app/components/identification/identification.module';
import { ValidateDriverComponent } from './validate-driver/validate-driver.component';
import { PipesModule } from 'src/app/shared/application/pipes/pipes.module';
import { ListUsersComponent } from './list-users/list-users.component';
import { NewUserComponent } from './new-user/new-user.component';
import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';

@NgModule({
  declarations: [
    UsersComponent,
    NewUserComponent,
    ListUsersComponent,
    ValidateDriverComponent
  ],
  exports: [
    UsersComponent,
    NewUserComponent,
    ListUsersComponent,
    ValidateDriverComponent
  ],
  imports: [
    PipesModule,
    FormsModule,
    CommonModule,
    MatListModule,
    MatIconModule,
    MatSortModule,
    MatTableModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDividerModule,
    MatTooltipModule,
    MatStepperModule,
    MatFormFieldModule,
    MatPaginatorModule,
    UsersRoutingModule,
    IdentificationModule,
    MatProgressBarModule,
    MatProgressSpinnerModule
  ]
})
export class UsersModule { }