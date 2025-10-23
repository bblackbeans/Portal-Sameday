import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts';
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
import { MatDialogModule } from '@angular/material/dialog';
import { FinancialComponent } from './resume/financial.component';
import { FinancialRoutingModule } from './financial-routing.module';
import { PipesModule } from 'src/app/shared/application/pipes/pipes.module';
import { AdminInvoiceComponent } from './admin-invoice/admin-invoice.component';
import { DriverInvoiceComponent } from './driver-invoice/driver-invoice.component';
import { DriverRankingComponent } from './driver-ranking/driver-ranking.component';
import { IdentificationModule } from 'src/app/components/identification/identification.module';
import { DriverPaymentComponent } from './driver-payment/driver-payment.component';
import { DriverAccountComponent } from './driver-account/driver-account.component';

@NgModule({
  declarations: [
    FinancialComponent,
    AdminInvoiceComponent,
    DriverRankingComponent,
    DriverInvoiceComponent,
    DriverPaymentComponent,
    DriverAccountComponent,
  ],
  exports: [
    FinancialComponent,
    AdminInvoiceComponent,
    DriverRankingComponent,
    DriverInvoiceComponent,
    DriverPaymentComponent,
    DriverAccountComponent,
  ],
  imports: [
    PipesModule,
    FormsModule,
    CommonModule,
    ChartsModule,
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
    IdentificationModule,
    MatProgressBarModule,
    FinancialRoutingModule,
    MatProgressSpinnerModule,
    MatDialogModule
  ]
})
export class FinancialModule { }