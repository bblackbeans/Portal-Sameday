import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalAlertService } from 'src/app/shared/modal-alert.service';
import { LoginService } from 'src/app/components/login/login.service';
import { FunctionsService } from 'src/app/shared/functions.service';
import { TabsReset } from '../models/tabs-reset';
import { OrderService } from '../order.service';
import { Tabs } from '../models/tabs';

@Component({
  selector: 'app-same-day-view-order',
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.scss']
})
export class ViewOrderComponent implements OnInit {

  public viewOrder: Tabs = new TabsReset();
  public pageLoading: boolean = false;

  public markerA = null;
  public markerB = null;

  constructor(
    private _router: Router,
    private _orderService: OrderService,
    private _loginService: LoginService,
    private _functions: FunctionsService,
    private _modalAlertService: ModalAlertService,
  ) { }

  ngOnInit(): void {
    this.getOrderDetail();
  }

  private getOrderDetail(): void {
    const params = {
      idSelectedOrder: this._loginService.getIdSelectedOrder()
    }

    this.pageLoading = true;
    this._orderService.getOrderInfo(params)
      .subscribe((x) => {
        if (x.status === 'success') {
          const information = x.order.orderInformation;
          const locationA = information.withdraw.location;
          const locationB = information.destiny.location;

          this.markerA = new google.maps.LatLng(locationA.lat, locationA.lng)
          this.markerB = new google.maps.LatLng(locationB.lat, locationB.lng)

          const summarizeParams = {
            km: x.order.km,
            price: x.order.price,
            duration: x.order.duration,
          }

          setTimeout(() => {
            this.viewOrder.collectionSite = information.withdraw;
            this.viewOrder.deliveryPlace = information.destiny;
            this.viewOrder.summarize = summarizeParams;
            this.viewOrder.items = x.order.items;
            this.pageLoading = false;
          }, 500);
        } else if (x.status === 'error') {
          this.msgError(x);
          this.pageLoading = false;
          this._router.navigate(['/order/list']);
        }
      }, (err) => {
        this.msgError(err);
        this.pageLoading = false;
        this._router.navigate(['/order/list']);
      });
  }

  private msgError(err): void {
    const msg = this._functions.treatsErrorMessage('', err);
    this._modalAlertService.alertModal('Ops!', msg);
  }
}