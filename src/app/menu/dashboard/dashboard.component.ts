import * as moment from 'moment';
import 'moment/locale/pt-br';
import { Label } from 'ng2-charts';
import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Totals, TotalsReset } from './models/totals';
import { DashboardService } from './dashboard.service';
import { FunctionsService } from 'src/app/shared/functions.service';
import { ModalAlertService } from 'src/app/shared/modal-alert.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public pageLoading: boolean = true;
  public graphicsLoading: boolean = true;
  public totals: Totals = new TotalsReset();
  public barChartOptions: ChartOptions = {
    responsive: true,
  };

  public barChartDataDriver: ChartDataSets[] = [
    { data: [0, 0, 0, 0, 0, 0, 0], label: 'Motoristas' },
  ]
  public barChartDataClient: ChartDataSets[] = [
    { data: [0, 0, 0, 0, 0, 0, 0], label: 'Clientes' },
  ]
  public barChartDataKms: ChartDataSets[] = [
    { data: [0, 0, 0, 0, 0, 0, 0], label: 'KMs rodados' },
  ]
  public barChartDataGoodsDelivered: ChartDataSets[] = [
    { data: [0, 0, 0, 0, 0, 0, 0], label: 'Em mercadoria entregue' }
  ];

  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  constructor(
    private _functions: FunctionsService,
    private _dashboardService: DashboardService,
    private _modalAlertService: ModalAlertService,
  ) { }

  ngOnInit() {
    this.selectWeekMonthYear('days');
    this.getDashboardData('pageLoading');
  }

  selectWeekMonthYear(option: string) {
    this.graphicsLoading = true;
    this.barChartLabels = [];

    for (let index = 0; index < 7; index++) {
      switch (option) {
        case 'days':
          const days = moment().add(`-${index}`, 'days').format('ddd').toUpperCase();
          this.barChartLabels.push(days)
          break;
        case 'months':
          const months = moment().add(`-${index}`, 'months').format('MMMM').toUpperCase();
          this.barChartLabels.push(months)
          break;
        case 'years':
          const years = moment().add(`-${index}`, 'years').format('YYYY').toUpperCase();
          this.barChartLabels.push(years)
          break;
      }
    }

    this._dashboardService.getDashboardGraphics({ type: option })
      .subscribe((x) => {
        if (x.status === 'success') {
          const { client, driver, goodsDelivered, kms } = x.totals;

          setTimeout(() => {
            this.barChartDataDriver = [
              { data: [driver.an, driver.two, driver.three, driver.four, driver.five, driver.six, driver.seven], label: 'Motoristas' },
            ]
            this.barChartDataClient = [
              { data: [client.an, client.two, client.three, client.four, client.five, client.six, client.seven], label: 'Clientes' },
            ]
            this.barChartDataKms = [
              { data: [kms.an, kms.two, kms.three, kms.four, kms.five, kms.six, kms.seven], label: 'KMs rodados' },
            ]
            this.barChartDataGoodsDelivered = [
              { data: [goodsDelivered.an, goodsDelivered.two, goodsDelivered.three, goodsDelivered.four, goodsDelivered.five, goodsDelivered.six, goodsDelivered.seven], label: 'Em mercadoria entregue' }
            ]
            this.graphicsLoading = false;
          }, 500);
        } else if (x.status === 'error') {
          this.msgError(x);
          this.graphicsLoading = false;
        }
      }, (err) => {
        this.msgError(err);
        this.graphicsLoading = false;
      });
  }

  getDashboardData(_loading?: string): void {
    this[_loading] = true;
    this.totals = new TotalsReset();

    this._dashboardService.getDashboardData()
      .subscribe((x) => {
        if (x.status === 'success') {
          // Tratar caso API retorne null ou undefined de forma segura
          try {
            if (x.totals && typeof x.totals === 'object') {
              // Garantir que todos os campos existem antes de usar
              this.totals = {
                kms: x.totals.kms || 0,
                driver: x.totals.driver || x.totals.drivers || 0,
                client: x.totals.client || x.totals.clients || 0,
                goodsDelivered: x.totals.goodsDelivered || x.totals.merchandise || 0
              };
            } else {
              this.totals = new TotalsReset();
            }
          } catch (error) {
            console.warn('Erro ao processar totals do dashboard:', error);
            this.totals = new TotalsReset();
          }

          setTimeout(() => {
            this[_loading] = false;
          }, 200);
        } else if (x.status === 'error') {
          this.msgError(x);
          this[_loading] = false;
        }
      }, (err) => {
        // Tratar erro de forma não-bloqueante
        console.warn('Erro ao carregar dados do dashboard:', err);
        // Não mostrar modal de erro para dashboard, só logar no console
        this.totals = new TotalsReset();
        this[_loading] = false;
      });
  }

  private msgError(err) {
    const msg = this._functions.treatsErrorMessage('', err);
    this._modalAlertService.alertModal('Ops!', msg);
  }

}