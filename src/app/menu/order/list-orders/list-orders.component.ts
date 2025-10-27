import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import * as moment from 'moment';
import { DynamicMessageService } from 'src/app/shared/dynamic-message.service';
import { TotalsOrders, TotalsOrdersReset } from '../models/totals-orders';
import { ModalAlertService } from 'src/app/shared/modal-alert.service';
import { LoginService } from 'src/app/components/login/login.service';
import { FunctionsService } from 'src/app/shared/functions.service';
import { OrderService } from '../order.service';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { OrderInvoiceComponent } from 'src/app/menu/order/order-invoice/order-invoice.component';
import { User } from 'src/app/shared/models/User';
import { Profiles } from 'src/app/shared/models/dto/Profiles';
import { OrderStatus } from 'src/app/shared/models/dto/OrderStatus';

@Component({
  selector: 'app-same-day-list-orders',
  templateUrl: './list-orders.component.html',
  styleUrls: ['./list-orders.component.scss']
})
export class ListOrdersComponent implements OnInit, OnDestroy, AfterViewInit {

  displayedColumns: string[] = ['status', 'duration', 'km', 'price', 'paymentStatus', 'created_at', 'actions'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();

  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild('sort') sort: MatSort;

  public listenModalAlert: Subscription;
  public pageLoading: boolean = false;
  public listLoading: boolean = false;
  public dataOrders: any;

  public user: User;
  PROFILES: Profiles = new Profiles();
  ORDER_STATUS: OrderStatus = new OrderStatus();

  public totals: TotalsOrders = new TotalsOrdersReset();

  constructor(
    private _routerModule: Router,
    private _orderService: OrderService,
    private _loginService: LoginService,
    private _functions: FunctionsService,
    private _modalAlertService: ModalAlertService,
    private _dynamicMessage: DynamicMessageService,
    private _orderInvoice: MatBottomSheet,
  ) { }

  applyFilter(filterValue: string) {
    this.clearAndLoadTable(false);
    filterValue = filterValue.trim();
    this.dataSource.filter = filterValue;
  }

  ngOnInit(): void {
    this.listenModalAlert = this._modalAlertService.returnEvent.subscribe((x) => {
      this.listenModal(x);
    });

    this.user = this._loginService.getUser();

    this.getOrders('pageLoading');
  }

  getOrders(_loading): void {
    this[_loading] = true;
    this.totals = new TotalsOrdersReset();
    this._loginService.setIdSelectedOrder(null);

    this._orderService.getOrders()
      .subscribe((x) => {
        if (x.status === 'success') {
          this.dataOrders = x.orders;
          this.totals = x.totals;

          setTimeout(() => {
            this.clearAndLoadTable(false)
            this[_loading] = false;
          }, 200);
        } else if (x.status === 'error') {
          this.msgError(x);
          this[_loading] = false;
          this.clearAndLoadTable(true)
        }
      }, (err) => {
        // Tratar erro 404 ou API não implementada silenciosamente
        console.warn('API de listagem de pedidos não implementada:', err);
        this.dataOrders = [];
        this.totals = new TotalsOrdersReset();
        this.clearAndLoadTable(false)
        this[_loading] = false;
      });
  }

  viewOrder(_idOrder) {
    this._loginService.setIdSelectedOrder(_idOrder);
    this._routerModule.navigate(['/order/view'])
  }

  editOrder(_idOrder?) {
    if (!_idOrder) {
      this._routerModule.navigate(['/order/new'])

    } else {
      this._loginService.setIdSelectedOrder(_idOrder);
      this._routerModule.navigate(['/order/edit'])
    }
  }

  deleteOrder(order) {
    this._modalAlertService.alertModal(null, 'Tem certeza que deseja excluir o pedido da data '
      + moment(order.created_at).format('DD/MM/YYYY') + '?', 'yesno', 'excluirPedido', order.id);
  }

  private listenModal(_returnModal): void {
    if (_returnModal.event === 'yes') {
      if (_returnModal.action.action === 'excluirPedido') {
        this._orderService.deleteOrder(_returnModal.action.value)
          .subscribe((x) => {
            if (x.status === 'success') {
              this.getOrders('listLoading');
              this._dynamicMessage.open(x.message);

            } else if (x.status === 'error') {
              this.msgError(x);
            }
          }, (err) => {
            this.msgError(err);
          });
      } else if (_returnModal.action.action === 'refundOrder') {
        this._orderService.refundOrder(_returnModal.action.value)
          .subscribe((x) => {
            if (x.status === 'success') {
              this.getOrders('listLoading');
              this._dynamicMessage.open(x.message);

            } else if (x.status === 'error') {
              this.msgError(x);
            }
          }, (err) => {
            this.msgError(err);
          });
      }
    }
  }

  loadCssStatus(status): String {
    let statusCss = '';

    switch (status) {
      case 'pending':
        statusCss = 'statusPending';
        break;
      case 'execution':
        statusCss = 'statusExecution';
        break;
      case 'canceled':
        statusCss = 'statusCanceled';
        break;
      case 'finished':
        statusCss = 'statusFinished';
        break;
    }

    return statusCss;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  clearAndLoadTable(clean: boolean, _array?) {
    this.dataSource = new MatTableDataSource(_array ? _array : clean ? [] : this.dataOrders);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  reload() {
    this.getOrders('listLoading');
  }

  private msgError(err) {
    const msg = this._functions.treatsErrorMessage('', err);
    this._modalAlertService.alertModal('Ops!', msg);
  }

  ngOnDestroy(): void {
    this.listenModalAlert.unsubscribe();
  }

  getPaymentStatus(order:any) {
    var statusPayment = 'Não iniciado';
    var method = order.orderInvoice && order.orderInvoice.method == 'pix' ? "PIX" : "Cartão de crédito";
    if(!order.orderInvoice) {
      statusPayment = `Não iniciado`;
    } else if(order.orderInvoice.status == 'pending') {
      statusPayment = `Ag. pagamento (${method})`;
    } else if(order.orderInvoice.status == 'paid' || order.orderInvoice.status == 'approve') {
      statusPayment = `Pag. confirmado (${method})`;
    } else if(order.orderInvoice.status == 'canceled') {
      statusPayment = `Pag. cancelado (${method})`;
    } else if(order.orderInvoice.status == 'refunded') {
      statusPayment = `Pag. estornado (${method})`;
    } else if(order.orderInvoice.status == 'reprove') {
      statusPayment = `Pag. recusado (${method})`;
    } else if(order.orderInvoice.status == 'expired') {
      statusPayment = `Pag. expirado (${method})`;
    } else if(order.orderInvoice.status == 'authorized') {
      statusPayment = `Pag. autorizado (${method})`;
    } else if(order.orderInvoice.status == 'partially_paid') {
      statusPayment = `Pag. parcialmente (${method})`;
    }

    return statusPayment;
  }

  showQRCode(order:any) {
    this._orderInvoice.open(OrderInvoiceComponent, { data: { order: order } });
  }

  refundOrder(order) {
    this._modalAlertService.alertModal(null, 'Tem certeza que deseja estornar o pedido da data '
      + moment(order.created_at).format('DD/MM/YYYY') + '?', 'yesno', 'refundOrder', order.id);
  }
}