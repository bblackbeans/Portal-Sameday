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
          // Verificar se totals existe e tem as propriedades necessárias
          try {
            const { client, driver, goodsDelivered, kms } = x.totals || {};
            
            // Usar valores padrão se algum objeto for null/undefined
            const driverData = driver || { an: 0, two: 0, three: 0, four: 0, five: 0, six: 0, seven: 0 };
            const clientData = client || { an: 0, two: 0, three: 0, four: 0, five: 0, six: 0, seven: 0 };
            const kmsData = kms || { an: 0, two: 0, three: 0, four: 0, five: 0, six: 0, seven: 0 };
            const goodsData = goodsDelivered || { an: 0, two: 0, three: 0, four: 0, five: 0, six: 0, seven: 0 };

            setTimeout(() => {
              this.barChartDataDriver = [
                { data: [driverData.an || 0, driverData.two || 0, driverData.three || 0, driverData.four || 0, driverData.five || 0, driverData.six || 0, driverData.seven || 0], label: 'Motoristas' },
              ]
              this.barChartDataClient = [
                { data: [clientData.an || 0, clientData.two || 0, clientData.three || 0, clientData.four || 0, clientData.five || 0, clientData.six || 0, clientData.seven || 0], label: 'Clientes' },
              ]
              this.barChartDataKms = [
                { data: [kmsData.an || 0, kmsData.two || 0, kmsData.three || 0, kmsData.four || 0, kmsData.five || 0, kmsData.six || 0, kmsData.seven || 0], label: 'KMs rodados' },
              ]
              this.barChartDataGoodsDelivered = [
                { data: [goodsData.an || 0, goodsData.two || 0, goodsData.three || 0, goodsData.four || 0, goodsData.five || 0, goodsData.six || 0, goodsData.seven || 0], label: 'Em mercadoria entregue' }
              ]
              this.graphicsLoading = false;
            }, 500);
          } catch (error) {
            console.warn('Erro ao processar gráficos do dashboard:', error);
            this.graphicsLoading = false;
          }
        } else if (x.status === 'error') {
          this.msgError(x);
          this.graphicsLoading = false;
        }
      }, (err) => {
        console.warn('Erro ao carregar gráficos:', err);
        // Não mostrar modal de erro para gráficos
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