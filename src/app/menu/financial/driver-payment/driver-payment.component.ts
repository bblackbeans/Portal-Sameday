import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { FunctionsService } from 'src/app/shared/functions.service';
import { ModalAlertService } from 'src/app/shared/modal-alert.service';
import { FinancialService } from '../financial.service';

@Component({
  selector: 'app-same-day-driver-payment',
  templateUrl: './driver-payment.component.html',
  styleUrls: ['./driver-payment.component.scss']
})
export class DriverPaymentComponent implements OnInit {

  pageLoading: boolean = false;
  public listLoading: boolean = false;
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  displayedColumns: string[] = ['driverName', 'driverDocument', 'driverMail', 'driverPhone', 'qtdOrders', 'totalKms', 'totalValue', 'actions'];

  objDate = new Date();
  strDate = '';
  monthRef = '';

  constructor(
    private financialService: FinancialService,
    private _functions: FunctionsService,
    private _modalAlertService: ModalAlertService
    ) { }

  ngOnInit(): void {
    this.strDate = `${this.financialService.getMonthStr(this.objDate.getMonth())} - ${this.objDate.getFullYear()}`
    this.monthRef = `${this.financialService.padStr(this.objDate.getMonth() + 1)}/${this.objDate.getFullYear()}`
    this.getResumeReport('pageLoading');
  }

  applyFilter(filter) {
    console.log(filter)
  }

  getResumeReport(_loading) {
    this[_loading] = true;

    this.financialService.getDriverPayment(this.monthRef).subscribe(
      x => {
        if (x.status == "success") {
          this.dataSource = x.data;
          this[_loading] = false;
        }
        else if (x.status === 'error') {
          this.msgError(x);
          this[_loading] = false;
        }
      },
      error => {
        this.msgError(error);
        this[_loading] = false;
      }
    );
  }

  reload() {
    this.getResumeReport('pageLoading');
  }

  beforeMonth() {
    let m = this.objDate;
    let d1 = new Date(m.getFullYear(), (m.getMonth() - 1), 1);

    this.strDate = this.financialService.getMonthStr(d1.getMonth()) + " - " + d1.getFullYear();
    this.objDate = d1;
    this.monthRef = this.financialService.padStr(d1.getMonth() + 1) + "/" + d1.getFullYear();
    // do find data
    this.getResumeReport('pageLoading');
  }

  afterMonth() {
    let m = this.objDate;
    let d1 = new Date(m.getFullYear(), (m.getMonth() + 1), 1);

    this.strDate = this.financialService.getMonthStr(d1.getMonth()) + " - " + d1.getFullYear();
    this.objDate = d1;
    this.monthRef = this.financialService.padStr(d1.getMonth() + 1) + "/" + d1.getFullYear();

    // do find data
    this.getResumeReport('pageLoading');
  }

  private msgError(err) {
    const msg = this._functions.treatsErrorMessage('', err);
    this._modalAlertService.alertModal('Ops!', msg);
  }


}
