import { Component, Inject, OnInit } from '@angular/core';
import { CreditCard, CreditCardInvalid } from 'src/app/shared/models/CreditCard';
import {MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA} from '@angular/material/bottom-sheet';
import { OrderService } from 'src/app/menu/order/order.service';
import { DynamicMessageService } from 'src/app/shared/dynamic-message.service';
import { FunctionsService } from 'src/app/shared/functions.service';
import { ModalAlertService } from 'src/app/shared/modal-alert.service';
import { Router } from '@angular/router';
import { IuguService } from 'src/app/shared/iugu.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-same-day-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.scss']
})
export class OrderSummaryComponent implements OnInit {

  idOrder=null;
  requestData=null;
  
  loading$:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  orderInvoice$: BehaviorSubject<any> = new BehaviorSubject<any>({});

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private _orderService: OrderService,
    private _dynamicMessage: DynamicMessageService,
    private _functions: FunctionsService,
    private _modalAlertService: ModalAlertService,
    private _router: Router,
    private _bottomSheetRef: MatBottomSheetRef<OrderSummaryComponent>,
    private _iugujs: IuguService,
  ) { }

  paymentType:string = 'pix';
  credit: CreditCard = new CreditCard();

  ngOnInit(): void {
    console.log('>>> data', this.data);
    this.idOrder = this.data.idOrder;
    this.requestData = this.data.request;

    this.orderInvoice$.subscribe(data => {
      if(data.mode) {
        this.sendOrderInvoice(data.mode, data.creditCardToken);
      }
    });
  }

  step = 0;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  flipCard() {
      var cardDOM = document.getElementById("card-flip");
      cardDOM.classList.toggle('flip-hover-in');
  }

  paymentPix() {
    if(!this.idOrder) this.save('pix');
    else this.orderInvoice$.next({ mode: 'pix', creditCardToken: null });;
  }

  private msgError(err): void {
    const msg = this._functions.treatsErrorMessage('', err);
    this._modalAlertService.alertModal('Ops!', msg);
  }

  changeCreditCard() {
    if(String(this.credit.number).length == 16) {
      this.credit.brand = this._iugujs.getBrandByCreditCardNumber(String(this.credit.number));
    }
  }

  async paymentCreditCard() {
    if(!this.credit.number || !this.credit.name || !this.credit.expireMonth || !this.credit.expireYear || !this.credit.verifiedCode) return this.msgError("É necessário informar todos os campos");

    var nameSplit = this.credit.name.split(' ', 1);
    var firstName = nameSplit[0];
    var lastName = this.credit.name.replace(firstName, '').trim();
    var creditCardToken = await this._iugujs.getCreditCardToken(
      String(this.credit.number),
      String(this.credit.expireMonth),
      String(this.credit.expireYear),
      firstName,
      lastName,
      String(this.credit.verifiedCode),
    )

    if(!creditCardToken || !creditCardToken.success) {
      let error_keys = Object.keys(creditCardToken.tokenId);
      let message = '';
      error_keys.forEach(item => {
        message += `${CreditCardInvalid[item]} <br>`;
      });
      return this.msgError(message);
    };

    if(!this.idOrder) this.save('credit', creditCardToken);
    else this.orderInvoice$.next({ mode: 'credit', creditCardToken: creditCardToken });
  }

  save(mode, creditCardToken?) {

    this.loading$.next(true);
    this._orderService.newOrder(this.requestData)
      .subscribe((x) => {
        this.loading$.next(false);
        if (x.status === 'success') {
          this.idOrder = x.data.id;
          this.orderInvoice$.next({ mode: mode, creditCardToken: creditCardToken });
        } else if (x.status === 'error') {
          this.msgError(x);
        }
      }, (err) => {
        this.msgError(err);
      });
  }

  sendOrderInvoice(mode, creditCardToken?) {
    
    if(!this.idOrder) return this.msgError("Erro ao selecionar o pedido");
    this.loading$.next(true);
    var creditCardTokenId = creditCardToken?.tokenId.id ?? null;

    /** Wait the IUGU access */
    this._orderService.sendOrderInvoice(this.idOrder, mode, creditCardTokenId).subscribe(
      (x) => {
        this.loading$.next(false);
        if (x.status === 'success') {
          this._dynamicMessage.open(x.message);
          this._bottomSheetRef.dismiss();

          setTimeout(() => {
            this._router.navigate(['/order/list']);
          }, 200);

        } else if (x.status === 'error') {
          this.msgError(x);
        }
      }, (err) => {
        this.loading$.next(false);
        console.log(err);
        this.msgError(err);
      }
    );
  }

}
