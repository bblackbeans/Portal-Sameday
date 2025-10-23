import { NguiMapModule } from '@ngui/map';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LocalStorageModule, LocalStorageService } from '@ruanitto/ngx-local-storage';
import { MatPaginationIntlService } from './shared/mat-pagination-intl.service';
import { NotFoundModule } from './components/not-found/not-found.module';
import { DynamicMessageService } from './shared/dynamic-message.service';
import { TokenInterceptor } from './shared/token-interceptor.service';
import { TermsComponent } from './components/terms/terms.component';
import { ModalAlertService } from './shared/modal-alert.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FunctionsService } from './shared/functions.service';
import { SettingsService } from './shared/settings.service';
import { WINDOW_PROVIDERS } from './shared/window.service';
import { HttpService } from './shared/http.service';
import { AppRoutingModule } from './app.routing';
import { AuthGuard } from './guards/auth-guard';
import { AppComponent } from './app.component';
import { IuguService } from './shared/iugu.service';
import { DriverDetailsModule } from './components/driver-details/driver-details.module';

@NgModule({
  declarations: [
    AppComponent,
    TermsComponent,
  ],
  imports: [
    BrowserModule,
    MatDialogModule,
    AppRoutingModule,
    HttpClientModule,
    DriverDetailsModule,
    MatSnackBarModule,
    LocalStorageModule.forRoot({
      prefix: 'same-day',
      storageType: 'localStorage'
    }),
    BrowserAnimationsModule,

    NguiMapModule.forRoot({apiUrl: 'https://maps.google.com/maps/api/js?key=AIzaSyDP1-mCf4NYmqm8dKA9jYKYNc3LkqwPDx4'})
  ],
  providers: [
    AuthGuard,
    HttpService,
    NotFoundModule,
    SettingsService,
    WINDOW_PROVIDERS,
    FunctionsService,
    ModalAlertService,
    LocalStorageService,
    DynamicMessageService,
    IuguService,
    {
      provide: MatPaginatorIntl,
      useClass: MatPaginationIntlService
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }