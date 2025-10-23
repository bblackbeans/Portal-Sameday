import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import { TermsComponent } from './components/terms/terms.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

const appRoutes: Routes = [
  {
    path: '',
    loadChildren: () => import('./layout/layout.module').then((m) => m.LayoutModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./components/login/login.module').then((m) => m.LoginModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./components/forgot-password/forgot-password.module').then((m) => m.ForgotPasswordModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./menu/register/register.module').then((m) => m.RegisterModule)
  },
  {
    path: 'terms',
    component: TermsComponent
  },
  {
    path: '404', component: NotFoundComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
  constructor(private router: Router) {
    this.router.errorHandler = () => {
      this.router.navigate(['404']);
    }
  }
}