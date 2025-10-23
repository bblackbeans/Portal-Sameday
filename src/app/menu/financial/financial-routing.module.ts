import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DriverRankingComponent } from './driver-ranking/driver-ranking.component';
import { AdminInvoiceComponent } from './admin-invoice/admin-invoice.component';
import { FinancialComponent } from './resume/financial.component';
import { DriverInvoiceComponent } from './driver-invoice/driver-invoice.component';
import { DriverPaymentComponent } from './driver-payment/driver-payment.component';
import { DriverAccountComponent } from './driver-account/driver-account.component';

const routes: Routes = [
  { path: 'resume', component: FinancialComponent  },
  { path: 'driver-ranking', component: DriverRankingComponent },
  { path: 'admin-invoice', component: AdminInvoiceComponent },
  { path: 'driver-invoice', component: DriverInvoiceComponent },

  { path: 'driver-invoice', component: DriverInvoiceComponent },
  { path: 'driver-payment', component: DriverPaymentComponent },
  { path: 'driver-account', component: DriverAccountComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinancialRoutingModule { }