import { ClipboardModule } from 'ngx-clipboard';
import { NgModule } from '@angular/core';
import { NgxMaskModule } from 'ngx-mask';
import { NguiMapModule } from '@ngui/map';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatSortModule } from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { UserInformationComponent } from 'src/app/components/user-information/user-information.component';
import { OrderSummaryComponent } from './order-summary/order-summary.component';
import { PipesModule } from 'src/app/shared/application/pipes/pipes.module';
import { ListOrdersComponent } from './list-orders/list-orders.component';
import { ViewOrderComponent } from './view-order/view-order.component';
import { ModalAlertService } from 'src/app/shared/modal-alert.service';
import { GmapsModule } from './../../components/gmaps/gmaps.module';
import { NewOrderComponent } from './new-order/new-order.component';
import { OrderRoutingModule } from './order-routing.module';
import { OrderComponent } from './order.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { CardBrandModule } from 'src/app/components/card-brand/card-brand.module';
import { OrderInvoiceComponent } from './order-invoice/order-invoice.component';


@NgModule({
  declarations: [
    OrderComponent,
    NewOrderComponent,
    ViewOrderComponent,
    ListOrdersComponent,
    OrderSummaryComponent,
    UserInformationComponent,
    OrderInvoiceComponent
  ],
  exports: [
    OrderComponent,
    NewOrderComponent,
    ViewOrderComponent,
    ListOrdersComponent,
  ],
  imports: [
    GmapsModule,
    PipesModule,
    FormsModule,
    CommonModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatSortModule,
    MatRadioModule,
    MatTableModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDividerModule,
    MatTooltipModule,
    MatStepperModule,
    MatFormFieldModule,
    MatPaginatorModule,
    OrderRoutingModule,
    MatProgressBarModule,
    MatBottomSheetModule,
    NgxMaskModule.forRoot(),
    MatProgressSpinnerModule,
    MatExpansionModule,
    CardBrandModule,
    ClipboardModule,
    NguiMapModule.forRoot({
      apiUrl: 'https://maps.google.com/maps/api/js?libraries=visualization,places,drawing&key=AIzaSyDP1-mCf4NYmqm8dKA9jYKYNc3LkqwPDx4'
    }),
  ],
  providers: [
    ModalAlertService,
  ],
})
export class OrderModule { }