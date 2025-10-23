import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListOrdersComponent } from './list-orders/list-orders.component';
import { ViewOrderComponent } from './view-order/view-order.component';
import { NewOrderComponent } from './new-order/new-order.component';
import { OrderComponent } from './order.component';

const routes: Routes = [
  {
    path: '', component: OrderComponent, 
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: ListOrdersComponent },
      { path: 'view', component: ViewOrderComponent },
      { path: 'edit', component: NewOrderComponent },
      { path: 'new', component: NewOrderComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }