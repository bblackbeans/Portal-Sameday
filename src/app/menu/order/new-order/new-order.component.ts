import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { UserInformationComponent } from 'src/app/components/user-information/user-information.component';
import { ResetPickupAndDestinationQuide } from '../models/pickupAndDestinationQuide';
import { OrderSummaryComponent } from '../order-summary/order-summary.component';
import { DynamicMessageService } from 'src/app/shared/dynamic-message.service';
import { ModalAlertService } from 'src/app/shared/modal-alert.service';
import { LoginService } from 'src/app/components/login/login.service';
import { FunctionsService } from 'src/app/shared/functions.service';
import { GmapsLegs, GmapsAddress } from '../../../components/gmaps/gmaps.dto';
import { TabsReset } from '../models/tabs-reset';
import { OrderService } from '../order.service';
import { Tabs } from '../models/tabs';
import { Item } from '../models/item';

@Component({
  selector: 'app-same-day-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.scss']
})
export class NewOrderComponent implements OnInit {

  public newOrder: Tabs = new TabsReset();
  public component: string = '';
  public pageLoading: boolean = false;

  public mask_collectionSite_cpf_cnpj: string = '';
  public mask_deliveryPlace_cpf_cnpj: string = '';

  public loading_collectionSite_zipCode = false;
  public loading_deliveryPlace_zipCode = false;
  public editAddressTab = false;

  public markerA = null;
  public markerB = null;
  public step: number = 0;
  public countWeight: number = 0;
  public valueOrder: string = '0,00';
  public showMap = false;

  public gmapLegs: GmapsLegs = new GmapsLegs();
  public exceededTheLimit: boolean = false;

  public gmapSource: GmapsAddress = new GmapsAddress();
  public gmapDestination: GmapsAddress = new GmapsAddress();

  public habledPaymentBtn = true;

  constructor(
    private _router: Router,
    private dialog: MatDialog,
    private _loginService: LoginService,
    private _orderService: OrderService,
    private _functions: FunctionsService,
    private _orderSummary: MatBottomSheet,
    private _modalAlertService: ModalAlertService,
    private _dynamicMessage: DynamicMessageService,
  ) { }

  ngOnInit(): void {
    const params = {
      idSelectedOrder: this._loginService.getIdSelectedOrder()
    }

    switch (this._router.url) {
      case '/order/new':
        this.newOrder.items = [this.itemDefault()];
        this._loginService.setIdSelectedOrder(null);
        this.component = 'newOrder';
        break;
      case '/order/edit':
        this.component = 'editOrder';
        this.getOrder(params);
        break;
    }
  }

  private getOrder(_params) {
    this.pageLoading = true;

    this._orderService.getOrder(_params)
      .subscribe((x) => {
        if (x.status === 'success') {
          const information = x.order.orderInformation;
          this.typeUser('collectionSite', information.withdraw.typeUser);
          this.typeUser('deliveryPlace', information.destiny.typeUser);

          setTimeout(() => {
            this.newOrder.messageToDriver = x.order.messageToDriver;
            this.newOrder.collectionSite = information.withdraw;
            this.newOrder.deliveryPlace = information.destiny;

            this.newOrder.items = x.order.items;
            this.pageLoading = false;
          }, 200);
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

  public typeUser(model, type) {
    this.newOrder[model] = new ResetPickupAndDestinationQuide();
    this.newOrder[model].typeUser = type;
    const mask = `mask_${model}_cpf_cnpj`;

    this[mask] = type === 'business' ? '00.000.000/0000-00' : '000.000.000-00';
  }

  public async nextTab(stepper: MatStepper, tab?): Promise<void> {
    let next = true;
    this.step == stepper.selectedIndex;

    if (tab === 'collectionSite' || tab === 'deliveryPlace') {
      next = this.validatePickupAndDestination(tab);

      if (next) {

        const address = this.newOrder[tab];

        const ad = {
          city: address.city,
          state: address.state,
          number: address.number,
          address: address.address,
          zipCode: address.zipCode,
          district: address.district,
          complement: address.complement,
        }

        const x = await this._orderService.getLatLngThroughAddress(ad).toPromise();
        if (x.status === 'success') {
          if (this.newOrder[tab].location) {
            this.newOrder[tab].location.lat = x.location.lat;
            this.newOrder[tab].location.lng = x.location.lng;
          } else {
            this.newOrder[tab].location = { lat: x.location.lat, lng: x.location.lng };
          }

          if (stepper.selectedIndex == 0) {
            this.markerA = new google.maps.LatLng(x.location.lat, x.location.lng)
          }
          if (stepper.selectedIndex == 2) {
            this.markerB = new google.maps.LatLng(x.location.lat, x.location.lng)
          }

        } else if (x.status === 'error') {
          this.msgError(x);
        }

        if (this.editAddressTab || stepper.selectedIndex === 2) {
          stepper.selectedIndex = 3
          this.editAddressTab = false;
        }
      }
    } else if (tab === 'items') {
      next = this.validateItem();
    }

    if (next && !this.editAddressTab && stepper.selectedIndex != 2) {
      stepper.next();
    }

    if (stepper.selectedIndex == 3) {
      setTimeout(() => {
        this.showMap = true;
      }, 500);
    } else {
      this.showMap = false
    }
  }

  public editAddress(stepper: MatStepper, model?) {
    this.editAddressTab = true;

    if (model === 'collectionSite') {
      stepper.selectedIndex = 0
    } else {
      stepper.selectedIndex = 2
    }
  }

  openBottomSheet(): void {
    var params = {
      order: this.newOrder,
      price: this.valueOrder,
      km: this.gmapLegs.distance,
      duration: this.gmapLegs.duration,
      messageToDriver: this.newOrder.messageToDriver,
      route: {
        locationA: {
          lat: this.gmapSource.location.lat,
          lng: this.gmapSource.location.lng
        },
        locationB: {
          lat: this.gmapDestination.location.lat,
          lng: this.gmapDestination.location.lng
        }
      },
      idSelectedOrder: this._loginService.getIdSelectedOrder(),
    }

    params.order.collectionSite = this.gmapSource;
    params.order.deliveryPlace = this.gmapDestination;

    this._orderSummary.open(OrderSummaryComponent, { data: { order: this.newOrder, request: params, idOrder: this._loginService.getIdSelectedOrder() } });
  }

  public save() {
    var params = {
      order: this.newOrder,
      price: this.valueOrder,
      km: this.gmapLegs.distance,
      duration: this.gmapLegs.duration,
      messageToDriver: this.newOrder.messageToDriver,
      route: {
        locationA: {
          lat: this.gmapSource.location.lat,
          lng: this.gmapSource.location.lng
        },
        locationB: {
          lat: this.gmapDestination.location.lat,
          lng: this.gmapDestination.location.lng
        }
      },
      idSelectedOrder: this._loginService.getIdSelectedOrder(),
    }

    if (this.component === 'newOrder') {
      this._orderService.newOrder(params)
        .subscribe((x) => {
          if (x.status === 'success') {
            this._dynamicMessage.open(x.message);

            setTimeout(() => {
              this._router.navigate(['/order/list']);
            }, 200);
          } else if (x.status === 'error') {
            this.msgError(x);
          }
        }, (err) => {
          this.msgError(err);
        });
    } else {
      this._orderService.putOrder(params)
        .subscribe((x) => {
          if (x.status === 'success') {
            this._dynamicMessage.open(x.message);

            setTimeout(() => {
              this._router.navigate(['/order/list']);
            }, 200);
          } else if (x.status === 'error') {
            this.msgError(x);
          }
        }, (err) => {
          this.msgError(err);
        });
    }
  }

  public reset(stepper: MatStepper) {
    this.newOrder = new TabsReset();
    stepper.reset();
  }

  public searchZipCode(model?: string) {
    const o = this.newOrder[model];
    const loading = `loading_${model}_zipCode`;

    if (o.zipCode && o.zipCode.length === 8) {


      if (this.validateZipCode(o.zipCode)) {
        this[loading] = true;
        this._orderService.getZipCode(o.zipCode)
          .subscribe((x) => {
            if (x.status === 'success') {
              this.fillForm(model, x.data);
              this[loading] = false;

            } else if (x.status === 'error') {
              this.cleanForm(model);
              this.msgError(x);
              this[loading] = false;
            }
          },
            (err) => {
              this.cleanForm(model);
              this.msgError(err);
              this[loading] = false;
            });
      } else {
        this.cleanForm(model);
      }

    } else {
      this._modalAlertService.alertModal('Ops!', 'Por favor preencha o campo CEP completo!');
      this.cleanForm(model);
    }
  }

  getHistoric(_model) {
    const type = this.newOrder[_model].typeUser;

    this._orderService.getHistoric(type)
      .subscribe((x) => {
        if (x.status === 'success') {
          const params = {
            historic: x.historic
          };

          const dialogRef = this.dialog.open(UserInformationComponent, {
            width: '800px',
            data: params,
            panelClass: 'app-same-day-user-information'
          });

          setTimeout(() => {
            dialogRef.afterClosed().subscribe(historic => {
              if (historic) {
                this.newOrder[_model] = historic;
                this.searchZipCode(_model);
              }
            });
          }, 300);
        } else if (x.status === 'error') {
          this.msgError(x);
        }
      },
        (err) => {
          this.msgError(err);
        });
  }

  private cleanForm(model) {
    const o = this.newOrder[model];

    o.city = null;
    o.state = null;
    o.number = null;
    o.address = null;
    o.district = null;
    o.complement = null;
    o.zipCode = null;
    o.location = {
      lat: null,
      lng: null
    }
  }

  private fillForm(model, address) {
    const o = this.newOrder[model];

    o.address = address.logradouro;
    o.district = address.bairro;
    o.city = address.localidade;
    o.state = address.uf;
  }

  public loadCssStatus(loading, model, _class): String {
    let statusCss = '';

    if (loading) {
      switch (model) {
        case 'collectionSite':
          statusCss = _class === 'content' ? 'contentCollectionSiteZipCode' : 'overlayCollectionSiteZipCode';
          break;

        case 'deliveryPlace':
          statusCss = _class === 'content' ? 'contentDeliveryPlaceZipCode' : 'overlayDeliveryPlaceZipCode';
          break;
      }
    }

    return statusCss
  }

  private validatePickupAndDestination(model) {
    const o = this.newOrder[model];

    const label_cpfcnpj = o.typeUser === 'business' ? 'CNPJ' : 'CPF';
    const label_name = o.typeUser === 'business' ? 'razão social' : 'nome completo';

    if (!o.cpfcnpj) {
      this._modalAlertService.alertModal('Ops!', 'Por favor preencha o campo ' + label_cpfcnpj + '!');
      return false;

    } else if (o.typeUser === 'business' ? !this._functions.validateCNPJ(o.cpfcnpj) : !this._functions.validateCPF(o.cpfcnpj)) {
      this._modalAlertService.alertModal('Ops!', 'O campo ' + label_cpfcnpj + ' não é válido.');
      return false;

    } else if (!o.name) {
      this._modalAlertService.alertModal('Ops!', 'Por favor preencha o campo ' + label_name + '!');
      return false;

    } else if (!this._functions.validateNameFull(o.name)) {
      this._modalAlertService.alertModal('Ops!', 'O campo ' + label_name + ' só tem um nome, por favor preencha o nome completo.');
      return false;

    } else if (o.typeUser === 'business' && !o.fantasyName) {
      this._modalAlertService.alertModal('Ops!', 'Por favor preencha o campo nome fantasia!');
      return false;

    } else if (!o.phone) {
      this._modalAlertService.alertModal('Ops!', 'Por favor preencha o campo telefone!');
      return false;

    } else if (!this._functions.validatePhone(o.phone)) {
      this._modalAlertService.alertModal('Ops!', 'O campo telefone não é válido.');
      return false;

    } else if (!o.email) {
      this._modalAlertService.alertModal('Ops!', 'Por favor preencha o campo e-mail!');
      return false;

    } else if (!this._functions.validateEmail(o.email)) {
      this._modalAlertService.alertModal('Ops!', 'O campo e-mail não contém um endereço de e-mail válido.');
      return false;

    } else if (!o.zipCode) {
      this._modalAlertService.alertModal('Ops!', 'Por favor preencha o campo CEP!');
      return false;

    } else if (!this._functions.validateZipCode(o.zipCode)) {
      this._modalAlertService.alertModal('Ops!', 'O campo CEP não é válido.');
      return false;

    } else if (!o.address) {
      this._modalAlertService.alertModal('Ops!', 'Por favor preencha o campo endereço!');
      return false;

    } else if (!o.complement) {
      this._modalAlertService.alertModal('Ops!', 'Por favor preencha o campo complemento!');
      return false;

    } else if (!o.number) {
      this._modalAlertService.alertModal('Ops!', 'Por favor preencha o campo número!');
      return false;

    } else if (!o.district) {
      this._modalAlertService.alertModal('Ops!', 'Por favor preencha o campo bairro!');
      return false;

    } else if (!o.city) {
      this._modalAlertService.alertModal('Ops!', 'Por favor preencha o campo cidade!');
      return false;

    } else if (!o.state) {
      this._modalAlertService.alertModal('Ops!', 'Por favor preencha o campo UF!');
      return false;
    }

    return true
  }

  public toCheckConversionWeight() {
    let countWeight = 0;

    this.newOrder.items.forEach((item) => {
      let { weight, conversion_weight, quantity } = item;

      if (weight && conversion_weight && quantity) {
        switch (conversion_weight) {
          case 'gramas':
            const calculationGrams = Number(quantity) * Number(weight);
            countWeight += Number(calculationGrams);
            break;
          case 'quilogramas':
            const calculationKilograms = Number(weight) * 1000;
            countWeight += Number(quantity) * Number(calculationKilograms);
            break;
        }
      }
    })

    return countWeight;
  }

  /**
   * @description The maximum allowed per delivery is 70 kg
   */
  private validateItem() {
    let noMistakes = true;

    if (this.newOrder.items.length) {
      this.countWeight = 0;

      this.newOrder.items.forEach((item, i) => {
        const nameObj = i + 1 + '° Objeto';
        let { name, width, conversion_width, height, conversion_height, length, conversion_length, weight, conversion_weight, quantity } = item;

        if (noMistakes) {
          if (!name) {
            this._modalAlertService.alertModal('Ops!', 'Por favor preencha o campo nome no ' + nameObj + '!');
            noMistakes = false;

          } else if (!width) {
            this._modalAlertService.alertModal('Ops!', 'Por favor preencha o campo largura ' + nameObj + '!');
            noMistakes = false;

          } else if (width && !conversion_width) {
            this._modalAlertService.alertModal('Ops!', 'Por favor selecione o campo largura - conversão ' + nameObj + '!');
            noMistakes = false;

          } else if (!height) {
            this._modalAlertService.alertModal('Ops!', 'Por favor preencha o campo altura ' + nameObj + '!');
            noMistakes = false;

          } else if (height && !conversion_height) {
            this._modalAlertService.alertModal('Ops!', 'Por favor selecione o campo altura - conversão ' + nameObj + '!');
            noMistakes = false;

          } else if (!length) {
            this._modalAlertService.alertModal('Ops!', 'Por favor preencha o campo comprimento ' + nameObj + '!');
            noMistakes = false;

          } else if (length && !conversion_length) {
            this._modalAlertService.alertModal('Ops!', 'Por favor selecione o campo comprimento - conversão ' + nameObj + '!');
            noMistakes = false;

          } else if (!weight) {
            this._modalAlertService.alertModal('Ops!', 'Por favor preencha o campo peso no ' + nameObj + '!');
            noMistakes = false;

          } else if (weight && !conversion_weight) {
            this._modalAlertService.alertModal('Ops!', 'Por favor selecione o campo peso - conversão ' + nameObj + '!');
            noMistakes = false;

          } else if (!quantity) {
            this._modalAlertService.alertModal('Ops!', 'Por favor preencha o campo quantidade no ' + nameObj + '!');
            noMistakes = false;
          }
        }
      })

      this.countWeight = this.toCheckConversionWeight();

      if (this.countWeight && this.countWeight > 70000) {
        this._modalAlertService.alertModal('Ops!', 'A carga não pode execeder 70 kg!');
        noMistakes = false;
      }

    } else {
      this._modalAlertService.alertModal('Ops!', 'Por favor adicione pelo menos um objeto!');
      noMistakes = false;
    }

    return noMistakes;
  }

  public addItem(): void {
    if (this.validateItem()) {
      let noMistakes = true;
      let countWeight = 0;

      countWeight = this.toCheckConversionWeight();

      if (countWeight && countWeight >= 70000) {
        this._modalAlertService.alertModal('Ops!', 'A carga não pode execeder 70 kg!');
        noMistakes = false;
      }

      if (noMistakes) this.newOrder.items.push(this.itemDefault());
    }
  }

  public removeItem(index: any): void {
    this.newOrder.items.splice(index, 1);
  }

  private itemDefault(): Item {
    return {
      name: null,
      model: null,
      width: null,
      conversion_width: null,
      height: null,
      conversion_height: null,
      length: null,
      conversion_length: null,
      weight: null,
      conversion_weight: null,
      quantity: null
    }
  }

  private msgError(err): void {
    const msg = this._functions.treatsErrorMessage('', err);
    this._modalAlertService.alertModal('Ops!', msg);
  }

  async getGmapLegs(event: GmapsLegs) {
    if (event.distance && event.duration) {
      this.gmapLegs = event;
      const calculationKilograms = this.countWeight / 1000;
      const distance = this.gmapLegs.distance.replace(/[aA-zZ]gi/, '').replace(',', '.');

      this._orderService.getOrderValue(calculationKilograms, parseInt(distance))
        .subscribe((x) => {
          if (x.status === 'success') {
            this.valueOrder = x.result;

          } else if (x.status === 'error') {
            this.msgError(x);
          }
        },
          (err) => {
            this.msgError(err);
          });
    };
  }

  getGmapSource(event: GmapsAddress) {
    if (this.validateZipCode(event.zipCode)) {
      this.gmapSource = event;
      this.habledPaymentBtn = true;
    } else {
      this.habledPaymentBtn = false;
    }
  }

  getGmapDestination(event) {
    if (this.validateZipCode(event.zipCode)) {
      this.gmapDestination = event;
      this.habledPaymentBtn = true;
    } else {
      this.habledPaymentBtn = false;
    }
  }

  validateZipCode(zipCode): boolean {
    const minCEP = 70000;
    const maxCEP = 73699;
    const regionOfTheFederalDistrictOnly = Number(zipCode.substr(0, 5));

    if (regionOfTheFederalDistrictOnly >= minCEP && regionOfTheFederalDistrictOnly <= maxCEP) {
      return true;
    } else {
      this._modalAlertService.alertModal('Ops!', 'Desculpe! No momento atendemos somente no Distrito Federal (DF). Em breve em todo o Brasil, verifique o endereço e tente novamente!');
      return false;
    }
  }

  updateAddressObject(origin, data) {
    data.address = origin.address;
    data.number = origin.number;
    data.city = origin.city;
    data.district = origin.district;
    data.zipCode = origin.zipCode;
    data.state = origin.state;
  }

}