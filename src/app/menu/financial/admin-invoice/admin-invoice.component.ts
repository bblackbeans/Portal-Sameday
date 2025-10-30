import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { FunctionsService } from 'src/app/shared/functions.service';
import { ModalAlertService } from 'src/app/shared/modal-alert.service';
import { FinancialService } from '../financial.service';
import { MatDialog } from '@angular/material/dialog';
import { DriverDetailsComponent, DialogDataProps } from 'src/app/components/driver-details/driver-details.component';

@Component({
  selector: 'app-same-day-admin-invoice',
  templateUrl: './admin-invoice.component.html',
  styleUrls: ['./admin-invoice.component.scss']
})
export class AdminInvoiceComponent implements OnInit {

  pageLoading: boolean = false;

  displayedColumns: string[] = ['driverName', 'driverDocument', 'driverMail', 'driverPhone', 'qtdOrders', 'totalKms', 'totalValue', 'actions'];
  public listLoading: boolean = false;
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();

  objDate = new Date();
  strDate = '';
  monthRef = '';

  constructor(
    private financialService: FinancialService,
    private _functions: FunctionsService,
    private _modalAlertService: ModalAlertService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.strDate = `${this.financialService.getMonthStr(this.objDate.getMonth())} - ${this.objDate.getFullYear()}`
    this.monthRef = `${this.financialService.padStr(this.objDate.getMonth() + 1)}/${this.objDate.getFullYear()}`
    this.getAdminInvoice('pageLoading');
  }

  openDialog(data: DialogDataProps): void {
    const dialogRef = this.dialog.open(DriverDetailsComponent, {
      width: '500px',
      data,
    });

    dialogRef.afterClosed().subscribe(() => console.log('The dialog was closed'));
  }

  applyFilter(filter) {
    console.log(filter)
  }

  reload() {
    this.getAdminInvoice('pageLoading');
  }

  getAdminInvoice(_loading) {
    this[_loading] = true;

    this.financialService.getAdminInvoice(this.monthRef).subscribe(
      x => {
        if (x.status == "success") {
          const list = x.data.listDrivers || [];
          if (!list || list.length === 0) {
            this._modalAlertService.alertModal('Sem dados', 'Sem dados para o período selecionado.');
          }
          this.dataSource = list;
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

  beforeMonth() {
    let m = this.objDate;
    let d1 = new Date(m.getFullYear(), (m.getMonth() - 1), 1);

    this.strDate = this.financialService.getMonthStr(d1.getMonth()) + " - " + d1.getFullYear();
    this.objDate = d1;
    this.monthRef = this.financialService.padStr(d1.getMonth() + 1) + "/" + d1.getFullYear();
    // do find data
    this.getAdminInvoice('pageLoading');
  }

  afterMonth() {
    let m = this.objDate;
    let d1 = new Date(m.getFullYear(), (m.getMonth() + 1), 1);

    this.strDate = this.financialService.getMonthStr(d1.getMonth()) + " - " + d1.getFullYear();
    this.objDate = d1;
    this.monthRef = this.financialService.padStr(d1.getMonth() + 1) + "/" + d1.getFullYear();

    // do find data
    this.getAdminInvoice('pageLoading');
  }

  private msgError(err) {
    const msg = this._functions.treatsErrorMessage('', err);
    this._modalAlertService.alertModal('Ops!', msg);
  }

}
