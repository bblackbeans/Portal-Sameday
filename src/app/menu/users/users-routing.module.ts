import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ValidateDriverComponent } from './validate-driver/validate-driver.component';
import { ListUsersComponent } from './list-users/list-users.component';
import { NewUserComponent } from './new-user/new-user.component';
import { UsersComponent } from './users.component';

const routes: Routes = [
  {
    path: '', component: UsersComponent,
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: ListUsersComponent },
      { path: 'edit', component: NewUserComponent },
      { path: 'new', component: NewUserComponent },
      { path: 'driver/validate', component: ValidateDriverComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }