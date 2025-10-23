import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxScrollTopModule } from 'ngx-scrolltop';
import { MatMenuModule } from '@angular/material/menu';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatRippleModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutComponent } from './layout.component';
import { LayoutRoutingModule } from './layout.routing';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { PipesModule } from '../shared/application/pipes/pipes.module';
import { AttachFileModule } from '../components/attach-file/attach-file.module';
import { ModalAlertComponent } from '../components/modal-alert/modal-alert.component';
import { NotificationsComponent } from '../components/notifications/notifications.component';
import { ProgressSpinnerModule } from '../components/progress-spinner/progress-spinner.module';

@NgModule({
  declarations: [
    LayoutComponent,
    NavbarComponent,
    FooterComponent,
    SidebarComponent,
    ModalAlertComponent,
    NotificationsComponent,
  ],

  imports: [
    PipesModule,
    FormsModule,
    CommonModule,
    MatIconModule,
    MatSortModule,
    MatMenuModule,
    MatTableModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatRippleModule,
    MatDialogModule,
    MatTooltipModule,
    AttachFileModule,
    NgxScrollTopModule,
    MatFormFieldModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    LayoutRoutingModule,
    ProgressSpinnerModule,
  ],
})

export class LayoutModule { }