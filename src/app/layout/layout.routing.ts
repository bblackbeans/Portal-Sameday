import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotificationsComponent } from '../components/notifications/notifications.component';
import { LayoutComponent } from './layout.component';
import { AuthGuard } from '../guards/auth-guard';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'user-profile', pathMatch: 'full' },
            { path: 'dashboard', loadChildren: () => import('../menu/dashboard/dashboard.module').then(m => m.DashboardModule), canActivate: [AuthGuard] },
            { path: 'user-profile', loadChildren: () => import('../menu/user-profile/user-profile.module').then(m => m.UserProfileModule), canActivate: [AuthGuard] },
            { path: 'order', loadChildren: () => import('../menu/order/order.module').then(m => m.OrderModule), canActivate: [AuthGuard] },
            { path: 'users', loadChildren: () => import('../menu/users/users.module').then(m => m.UsersModule), canActivate: [AuthGuard] },
            { path: 'financial', loadChildren: () => import('../menu/financial/financial.module').then(m => m.FinancialModule), canActivate: [AuthGuard] },
            { path: 'notifications', component: NotificationsComponent, canActivate: [AuthGuard] },
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule { }