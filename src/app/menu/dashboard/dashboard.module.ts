import { NgModule } from '@angular/core';
import { NgxMaskModule } from 'ngx-mask';
import { ChartsModule } from 'ng2-charts';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';

@NgModule({
  declarations: [
    DashboardComponent
  ],
  exports: [
    DashboardComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    ChartsModule,
    MatButtonModule,
    MatProgressBarModule,
    DashboardRoutingModule,
    NgxMaskModule.forRoot(),
    MatProgressSpinnerModule,
  ]
})
export class DashboardModule { }