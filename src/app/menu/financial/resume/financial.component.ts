import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { FunctionsService } from 'src/app/shared/functions.service';
import { ModalAlertService } from 'src/app/shared/modal-alert.service';
import { FinancialService } from '../financial.service';
import { MatDialog } from '@angular/material/dialog';
import { DriverDetailsComponent, DialogDataProps } from 'src/app/components/driver-details/driver-details.component';

@Component({
  selector: 'app-same-day-financial',
  templateUrl: './financial.component.html',
  styleUrls: ['./financial.component.scss']
})
export class FinancialComponent implements OnInit {

  pageLoading: boolean = false;

  public barChartDataDriver: ChartDataSets[] = [
    { data: [], order: 2, label: '01/20222' },

    { type: 'line', order: 1, lineTension: 0.2, borderColor: "#9c27b0", backgroundColor: "#e0ade9", pointBackgroundColor: "#FFFFFF", pointBorderColor: "#FFFFFFF", data: [], label: 'Motoristas' },
  ]

  public barChartLabels: Label[] = [];

  public barChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      display: false
    },
    title: {
      display: true,
      text: "Evolução de Ganhos"
    }
  };

  public barChartPlugins = [];
  public barChartLegend = true;
  public barChartType: ChartType = 'bar';

  displayedColumns: string[] = ['driverName', 'driverDocument', 'driverMail', 'driverPhone', 'qtdOrders', 'totalKms', 'totalValue', 'actions'];
  public listLoading: boolean = false;
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();

  objDate = new Date();
  strDate = '';
  monthRef = '';

  cardData = {
    ordersQtd: 0,
    orderTotal: "0,00",
    receivedAmount: "0,00",
    diffLastMonth: {
      icon: "",
      value: "00,00%"
    }
  }

  constructor(
    private financialService: FinancialService,
    private _functions: FunctionsService,
    private _modalAlertService: ModalAlertService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.strDate = `${this.financialService.getMonthStr(this.objDate.getMonth())} - ${this.objDate.getFullYear()}`
    this.monthRef = `${this.financialService.padStr(this.objDate.getMonth() + 1)}/${this.objDate.getFullYear()}`
    this.getResumeReport('pageLoading');
  }

  openDialog(data: DialogDataProps): void {
    const dialogRef = this.dialog.open(DriverDetailsComponent, {
      width: '500px',
      data,
    });

    dialogRef.afterClosed().subscribe(() => console.log('The dialog was closed'));
  }

  getResumeReport(_loading) {
    this[_loading] = true;

    this.financialService.getResume(this.monthRef).subscribe(
      x => {
        if (x.status == "success") {
          this[_loading] = false;

          this.cardData = x.data.cards;
          const list = x.data.listDrivers || [];
          if (!list || list.length === 0) {
            this._modalAlertService.alertModal('Sem dados', 'Sem dados para o período selecionado.');
          }
          this.dataSource = list;
          
          if(x.data.chartData.labels) {
            this.barChartLabels = x.data.chartData.labels;
            this.barChartDataDriver[0].data = x.data.chartData.data;
            this.barChartDataDriver[1].data = x.data.chartData.data;
          }         
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

  applyFilter(filter) {
    console.log(filter)
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
