import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ClientReset } from './models/client';
import { AddressReset } from './models/address';
import { LoginService } from '../login/login.service';
import { Standard, StandardReset } from './models/standard';
import { IdentificationService } from './identification.service';
import { FunctionsService } from 'src/app/shared/functions.service';
import { ModalAlertService } from 'src/app/shared/modal-alert.service';
import { AttachFileService } from '../attach-file/attach-file.service';
import { DynamicMessageService } from 'src/app/shared/dynamic-message.service';
import { NgModelCategory, NgModelCategoryReset } from './models/ngModelCategory';
import { ViewAttachmentComponent } from '../view-attachment/view-attachment.component';

@Component({
  selector: 'app-same-day-identification',
  templateUrl: './identification.component.html',
  styleUrls: ['./identification.component.scss']
})
export class IdentificationComponent implements OnInit, OnDestroy {

  public selectedTypeOfUser: boolean = false;
  public listenModalAlert: Subscription;
  public listenAttachFile: Subscription;
  public pageLoading: boolean = false;
  public profileLoggedUser: string = '';
  public mask_cpf_cnpj: string = '';
  public profileUser: string = '';
  public typeOfUser: string = '';
  public component: string = '';
  public action: string = '';

  public hide1: boolean = false;
  public hide2: boolean = false;
  public checkStrongBar: number = 0;
  public showDetails: boolean = true;
  public pattern = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%&*()]).{6,}/;

  // Models
  public info: Standard = new StandardReset;
  public cnhPhoto: NgModelCategory = new NgModelCategoryReset;
  public driverPhoto: NgModelCategory = new NgModelCategoryReset;
  public vehiclePhoto: NgModelCategory = new NgModelCategoryReset;
  public antecedentPhoto: NgModelCategory = new NgModelCategoryReset;
  public documentPhotoCRLV: NgModelCategory = new NgModelCategoryReset;
  public photoOfProofOfAddress: NgModelCategory = new NgModelCategoryReset;

  public loading_zipCode = false;
  public loading_cnhPhoto = false;
  public loading_driverPhoto = false;
  public loading_vehiclePhoto = false;
  public loading_antecedentPhoto = false;
  public loading_documentPhotoCRLV = false;
  public loading_photoOfProofOfAddress = false;

  constructor(
    private _router: Router,
    private dialog: MatDialog,
    private _loginService: LoginService,
    private _functions: FunctionsService,
    private _attachFileService: AttachFileService,
    private _modalAlertService: ModalAlertService,
    private _dynamicMessage: DynamicMessageService,
    private _identificationService: IdentificationService,
  ) { }

  ngOnInit(): void {
    this.listenModalAlert = this._modalAlertService.returnEvent.subscribe((x) => {
      this.listenModal(x);
    });

    this.listenAttachFile = this._attachFileService.fileLoading_cnhPhoto.subscribe((action) => {
      this.loading_cnhPhoto = action;
    });

    this.listenAttachFile = this._attachFileService.fileLoading_driverPhoto.subscribe((action) => {
      this.loading_driverPhoto = action;
    });

    this.listenAttachFile = this._attachFileService.fileLoading_vehiclePhoto.subscribe((action) => {
      this.loading_vehiclePhoto = action;
    });

    this.listenAttachFile = this._attachFileService.fileLoading_antecedentPhoto.subscribe((action) => {
      this.loading_antecedentPhoto = action;
    });

    this.listenAttachFile = this._attachFileService.fileLoading_documentPhotoCRLV.subscribe((action) => {
      this.loading_documentPhotoCRLV = action;
    });

    this.listenAttachFile = this._attachFileService.fileLoading_photoOfProofOfAddress.subscribe((action) => {
      this.loading_photoOfProofOfAddress = action;
    });

    const params = {
      idSelectedUser: this._loginService.getIdSelectedUser()
    }

    switch (this._router.url) {
      case '/register':
        this._loginService.setIdSelectedUser(null)
        this.component = 'register';
        this.action = 'insert';
        break;
      case '/user-profile':
        this._loginService.setIdSelectedUser(null)
        this.component = 'userProfile';
        this.action = 'update';
        this.getProfile();
        break;
      case '/users/new':
        this._loginService.setIdSelectedUser(null)
        this.component = 'userNew';
        this.action = 'insert';
        break;
      case '/users/edit':
        this.component = 'userEdit';
        this.action = 'update';
        this.getProfile(params);
        break;
      case '/users/driver/validate':
        this.component = 'userDriverValidate';
        this.action = 'update';
        this.getProfile(params);
        break;
    }
  }

  public searchZipCode() {
    if (this.info.address.zipCode && this.info.address.zipCode.length === 8) {
      this.loading_zipCode = true;
      this._identificationService.getZipCode(this.info.address.zipCode)
        .subscribe((x) => {
          if (x.status === 'success') {
            this.fillForm(x.data);
            this.loading_zipCode = false;

          } else if (x.status === 'error') {
            this.cleanForm();
            this.msgError(x);
            this.loading_zipCode = false;
          }
        },
          (err) => {
            this.cleanForm();
            this.msgError(err);
            this.loading_zipCode = false;
          });
    } else {
      this._modalAlertService.alertModal('Ops!', 'Por favor preencha o campo CEP completo!');
      this.cleanForm();
    }
  }

  private cleanForm() {
    const code = this.info.address.zipCode;

    this.info.address = new AddressReset;
    this.info.address.zipCode = code;
  }

  private fillForm(x) {
    this.info.address.address = x.logradouro;
    this.info.address.district = x.bairro;
    this.info.address.city = x.localidade;
    this.info.address.state = x.uf;
  }

  public typeUser(type) {
    switch (type) {
      case 'client':
      case 'business':
        this.info = new ClientReset();
        break;
      case 'driver':
        this.info = new StandardReset();
        break;
    }

    this.typeOfUser = type;
    this.selectedTypeOfUser = true;
    this.mask_cpf_cnpj = type === 'business' ? '00.000.000/0000-00' : '000.000.000-00';

    if (this.action === 'insert') {
      this.permission();
    }
  }

  private getProfile(_params?, _loading?) {
    this.pageLoading = !_loading;

    this._identificationService.getProfile(_params)
      .subscribe((x) => {
        if (x.status === 'success') {
          this.typeUser(x.user.typeUser)
          this.profileUser = x.user.profile;

          setTimeout(() => {
            this.mountingScreen(x.user);
            this.permission();
          }, 200);
        } else if (x.status === 'error') {
          this.msgError(x);
          this.pageLoading = false;
        }
      }, (err) => {
        this.msgError(err);
        this.pageLoading = false;
      });
  }

  private mountingScreen(user: any) {
    switch (user.typeUser) {
      case 'business':
        this.info.data.fantasyName = user.fantasyName;
        break;
      case 'driver':
        if (user.documents.length) {
          Object.keys(this.info.documents).forEach(async (model) => {
            this.info.documents[model] = user.documents.filter((row) => row.category === model)
          })
        }

        if (user.validateDriver.length) {
          Object.keys(this.info.validate).forEach(async (model) => {
            this.info.validate[model] = user.validateDriver.filter((row) => row.category === model)[0]
          })
        }

        if (user.deliveryVehicles) {
          this.info.vehicle = user.deliveryVehicles;
        }
        break;
    }

    // Data
    this.info.data.name = user.name;
    this.info.data.cpfcnpj = user.cpfcnpj;

    // Address
    if (user.address) {
      this.info.address = user.address;
    }

    // Contact
    this.info.contact.phone = user.phone;
    this.info.contact.email = user.email;
    this.info.contact.urlSite = user.urlSite;

    this.info.activatedUser = user.activatedUser;
    this.info.termsAccepted = user.termsAccepted;
    this.pageLoading = false;
  }

  private permission() {
    const user = this._loginService.getUser();
    this.profileLoggedUser = user ? user.profile : 'administrator';

    if (this.typeOfUser === 'driver') {
      Object.keys(this.info.validate).forEach(async (model) => {
        const info = this.info.validate;
        const pending = info[model].status === 'pending';
        const approved = info[model].status === 'approved';
        const reproved = info[model].status === 'reproved';
        const revision = info[model].status === 'revision';
        const admin = this.profileLoggedUser === 'administrator';

        this[model].status = info[model].status;
        this[model].reason = (reproved || revision) ? info[model].reason : null;
        this[model].actionRevision = this.component === 'userEdit' && admin && approved;
        this[model].actionApproved = this.component === 'userDriverValidate' && admin && pending;
        this[model].canAdd = this.action === 'insert' || ((reproved || revision) && this.component === 'userProfile');
        this[model].canDelete = this.action === 'insert' || ((reproved || revision) && this.component === 'userProfile');
      })
    }
  }

  public onSubmit(_action) {
    if (this.validateRequiredFields()) {
      const params = {
        idSelectedUser: this._loginService.getIdSelectedUser(),
        typeOfUser: this.typeOfUser,
        user: this.info
      }

      if (_action === 'insert') {
        this._identificationService.insertUser(params)
          .subscribe((x) => {
            if (x.status === 'success') {
              this._dynamicMessage.open(x.message);

              setTimeout(() => {
                this.navigateTo(null, this.component);
              }, 200);
            } else if (x.status === 'error') {
              this.msgError(x);
            }
          }, (err) => {
            this.msgError(err);
          });

      } else {
        this._identificationService.updateUser(params)
          .subscribe((x) => {
            if (x.status === 'success') {
              this._dynamicMessage.open(x.message);

              setTimeout(() => {
                if (this.component === 'userProfile') {
                  this.getProfile()
                } else {
                  this.getProfile({ idSelectedUser: params.idSelectedUser });
                }
              }, 200);
            } else if (x.status === 'error') {
              this.msgError(x);
            }
          }, (err) => {
            this.msgError(err);
          });
      }
    }
  }

  public strongPassword(detalhe) {
    this.showDetails = detalhe;
  }

  public onStrengthChanged(strength: number) {
    this.checkStrongBar = strength;
  }

  private listenModal(_returnModal): void {
    if (_returnModal.event === 'yes') {
      const params = {
        idSelectedUser: this._loginService.getIdSelectedUser(),
        action: _returnModal.action.action,
        category: _returnModal.action.value,
        reason: _returnModal.reason
      }

      this._identificationService.validDoc(params)
        .subscribe((x) => {
          if (x.status === 'success') {
            this.getProfile({ idSelectedUser: x.idUser }, 'notLoading');
            this._dynamicMessage.open(x.message);

          } else if (x.status === 'error') {
            this.msgError(x);
          }
        }, (err) => {
          this.msgError(err);
        });
    }
  }

  public validateDocuments(_nameDoc: string, _action) {
    let label = '';
    let action = _action === 'approved' ? 'aprovar' : _action === 'reproved' ? 'reprovar' : 'revisar';

    switch (_nameDoc) {
      case 'cnhPhoto':
        label = 'Tem certeza que deseja ' + action + ' os comprovantes da CNH?';
        break;
      case 'vehiclePhoto':
        label = 'Tem certeza que deseja ' + action + ' as fotos do veículo?';
        break;
      case 'driverPhoto':
        label = 'Tem certeza que deseja ' + action + ' a foto do motorista?';
        break;
      case 'antecedentPhoto':
        label = 'Tem certeza que deseja ' + action + ' as fotos dos antecedentes?';
        break;
      case 'documentPhotoCRLV':
        label = 'Tem certeza que deseja ' + action + ' as fotos dos documentos (CRLV)?';
        break;
      case 'photoOfProofOfAddress':
        label = 'Tem certeza que deseja ' + action + ' o comprovante de endereço?';
        break;
    }

    this._modalAlertService.alertModal(null, label, 'yesno', _action, _nameDoc, false);
  }

  public sequenceCheck(value) {
    if (!value) {
      this.checkStrongBar = 0;
    } else {
      if (value.length > 2) {
        const seq = ['012', '123', '234', '345', '456', '567', '678', '789'];

        seq.forEach(s => {
          if (value.indexOf(s) > -1) {
            this._modalAlertService.alertModal('Ops!', 'Senha não pode conter sequência numérica, com mais de 2 dígitos!');
          }
        });
      }
    }
  }

  public saveAttachment(e, _model) {
    this.info.documents[_model] = e;
  }

  public loadCssStatus(status, category?, classCategory?): String {
    let statusCss = '';

    if (status && category && classCategory) {
      switch (category) {
        // File Category 
        case 'cnhPhoto':
          statusCss = classCategory === 'content' ? 'contentCnhPhoto' : 'overlayCnhPhoto';
          break;
        case 'driverPhoto':
          statusCss = classCategory === 'content' ? 'contentDriverPhoto' : 'overlayDriverPhoto';
          break;
        case 'vehiclePhoto':
          statusCss = classCategory === 'content' ? 'contentVehiclePhoto' : 'overlayVehiclePhoto';
          break;
        case 'antecedentPhoto':
          statusCss = classCategory === 'content' ? 'contentAntecedentPhoto' : 'overlayAntecedentPhoto';
          break;
        case 'documentPhotoCRLV':
          statusCss = classCategory === 'content' ? 'contentDocumentPhotoCRLV' : 'overlayDocumentPhotoCRLV';
          break;
        case 'photoOfProofOfAddress':
          statusCss = classCategory === 'content' ? 'contentPhotoOfProofOfAddress' : 'overlayPhotoOfProofOfAddress';
          break;
        // End Category Files

        // Others
        case 'loading_zipCode':
          statusCss = classCategory === 'content' ? 'contentZipCode' : 'overlayZipCode';
          break;
      }
    } else if (status && !category && !classCategory) {
      switch (status) {
        case 'pending':
          statusCss = 'statusPending';
          break;
        case 'approved':
          statusCss = 'statusApproved';
          break;
        case 'reproved':
          statusCss = 'statusReproved';
          break;
        case 'revision':
          statusCss = 'statusRevision';
          break;
      }
    }

    return statusCss;
  }

  public loadCssActivatedUser(event) {
    let statusCss = '';

    if (event) {
      statusCss = 'activatedUser';
    } else {
      statusCss = 'disabledUser';
    }

    return statusCss;
  }

  private validateRequiredFields() {
    const i = this.info;

    const label_cpfcnpj = this.typeOfUser === 'business' ? 'CNPJ' : 'CPF';
    const label_name = this.typeOfUser === 'business' ? 'razão social' : 'nome completo';

    // Não validar CPF/CNPJ para admin ou se campo estiver desabilitado (update)
    const shouldValidateCPF = this.profileLoggedUser !== 'administrator' || this.component === 'userProfile';
    
    if (!i.data.cpfcnpj) {
      this._modalAlertService.alertModal('Ops!', 'Por favor preencha o campo ' + label_cpfcnpj + '!');
      return false;

    } else if (shouldValidateCPF && (this.typeOfUser === 'business' ? !this._functions.validateCNPJ(i.data.cpfcnpj) : !this._functions.validateCPF(i.data.cpfcnpj))) {
      this._modalAlertService.alertModal('Ops!', 'O campo ' + label_cpfcnpj + ' não é válido.');
      return false;

    } else if (!i.data.name) {
      this._modalAlertService.alertModal('Ops!', 'Por favor preencha o campo ' + label_name + '!');
      return false;

    } else if (!this._functions.validateNameFull(i.data.name)) {
      this._modalAlertService.alertModal('Ops!', 'O campo ' + label_name + ' só tem um nome, por favor preencha o nome completo.');
      return false;

    } else if (this.typeOfUser === 'business' && !i.data.fantasyName) {
      this._modalAlertService.alertModal('Ops!', 'Por favor preencha o campo nome fantasia!');
      return false;

    } else if (!i.address.zipCode) {
      this._modalAlertService.alertModal('Ops!', 'Por favor preencha o campo CEP!');
      return false;

    } else if (!this._functions.validateZipCode(i.address.zipCode)) {
      this._modalAlertService.alertModal('Ops!', 'O campo CEP não é válido.');
      return false;

    } else if (!i.address.address) {
      this._modalAlertService.alertModal('Ops!', 'Por favor preencha o campo endereço!');
      return false;

    } else if (!i.address.complement) {
      this._modalAlertService.alertModal('Ops!', 'Por favor preencha o campo complemento!');
      return false;

    } else if (!i.address.number) {
      this._modalAlertService.alertModal('Ops!', 'Por favor preencha o campo número!');
      return false;

    } else if (!i.address.district) {
      this._modalAlertService.alertModal('Ops!', 'Por favor preencha o campo bairro!');
      return false;

    } else if (!i.address.city) {
      this._modalAlertService.alertModal('Ops!', 'Por favor preencha o campo cidade!');
      return false;

    } else if (!i.address.state) {
      this._modalAlertService.alertModal('Ops!', 'Por favor preencha o campo UF!');
      return false;
    }

    if (this.typeOfUser === 'driver') {
      let { width, conversion_width, height, conversion_height, length, conversion_length, weight, conversion_weight } = i.vehicle;

      if (!i.vehicle.brand) {
        this._modalAlertService.alertModal('Ops!', 'Por favor preencha o campo marca!');
        return false;

      } else if (!i.vehicle.model) {
        this._modalAlertService.alertModal('Ops!', 'Por favor preencha o campo modelo!');
        return false;

      } else if (!i.vehicle.year) {
        this._modalAlertService.alertModal('Ops!', 'Por favor preencha o campo ano!');
        return false;

      } else if (!i.vehicle.color) {
        this._modalAlertService.alertModal('Ops!', 'Por favor preencha o campo cor!');
        return false;

      } else if (!i.vehicle.plate) {
        this._modalAlertService.alertModal('Ops!', 'Por favor preencha o campo placa!');
        return false;

      } else if (!i.vehicle.renavam) {
        this._modalAlertService.alertModal('Ops!', 'Por favor preencha o campo renavam!');
        return false;

      } else if (!i.vehicle.category) {
        this._modalAlertService.alertModal('Ops!', 'Por favor preencha o campo categoria!');
        return false;

      } else if (!width) {
        this._modalAlertService.alertModal('Ops!', 'Por favor preencha o campo largura!');
        return false;

      } else if (width && !conversion_width) {
        this._modalAlertService.alertModal('Ops!', 'Por favor selecione o campo largura - conversão!');
        return false;

      } else if (!height) {
        this._modalAlertService.alertModal('Ops!', 'Por favor preencha o campo altura!');
        return false;

      } else if (height && !conversion_height) {
        this._modalAlertService.alertModal('Ops!', 'Por favor selecione o campo altura - conversão!');
        return false;

      } else if (!length) {
        this._modalAlertService.alertModal('Ops!', 'Por favor preencha o campo comprimento!');
        return false;

      } else if (length && !conversion_length) {
        this._modalAlertService.alertModal('Ops!', 'Por favor selecione o campo comprimento - conversão!');
        return false;

      } else if (!weight) {
        this._modalAlertService.alertModal('Ops!', 'Por favor preencha o campo peso!');
        return false;

      } else if (weight && !conversion_weight) {
        this._modalAlertService.alertModal('Ops!', 'Por favor selecione o campo peso - conversão!');
        return false;

      } else if (!i.documents.cnhPhoto.length) {
        this._modalAlertService.alertModal('Ops!', 'Por favor anexar ao menos uma foto da CNH!');
        return false;

      } else if (!i.documents.vehiclePhoto.length) {
        this._modalAlertService.alertModal('Ops!', 'Por favor anexar ao menos uma foto do veículo!');
        return false;

      } else if (!i.documents.driverPhoto.length) {
        this._modalAlertService.alertModal('Ops!', 'Por favor anexar ao menos uma foto do motorista!');
        return false;

      } else if (!i.documents.antecedentPhoto.length) {
        this._modalAlertService.alertModal('Ops!', 'Por favor anexar ao menos uma foto dos antecedentes!');
        return false;

      } else if (!i.documents.documentPhotoCRLV.length) {
        this._modalAlertService.alertModal('Ops!', 'Por favor anexar ao menos uma foto do documento (CRLV)!');
        return false;

      } else if (!i.documents.photoOfProofOfAddress.length) {
        this._modalAlertService.alertModal('Ops!', 'Por favor anexar ao menos um comprovante de endereço!');
        return false;
      }
    }

    if (!i.contact.phone) {
      this._modalAlertService.alertModal('Ops!', 'Por favor preencha o campo telefone!');
      return false;

    } else if (!this._functions.validatePhone(i.contact.phone)) {
      this._modalAlertService.alertModal('Ops!', 'O campo telefone não é válido.');
      return false;

    } else if (!i.contact.email) {
      this._modalAlertService.alertModal('Ops!', 'Por favor preencha o campo e-mail!');
      return false;

    } else if (!this._functions.validateEmail(i.contact.email)) {
      this._modalAlertService.alertModal('Ops!', 'O campo e-mail não contém um endereço de e-mail válido.');
      return false;

    } else if (this.action === 'insert' && !i.password) {
      this._modalAlertService.alertModal('Ops!', 'Por favor crie uma senha!');
      return false;

    } else if (i.password && i.password !== i.passwordAgain) {
      this._modalAlertService.alertModal('Ops!', 'Por favor repita a mesma senha nos dois campos!');
      return false;

    } else if (i.password && this.checkStrongBar < 100) {
      this._modalAlertService.alertModal('Ops!', 'A senha que você digitou não atende aos requisitos de segurança!');
      return false;

    } else if (!i.termsAccepted) {
      this._modalAlertService.alertModal('Ops!', 'Para prosseguir você deve aceitar os termos e condições de uso!');
      return false;
    }

    return true;
  }

  public seeAttached() {
    const attachment = {
      type: 'PDF',
      name: 'Termos e Condições de Uso',
      url: '../../../assets/documents/regulation.pdf'
    }

    this.dialog.open(ViewAttachmentComponent, {
      width: '500px',
      data: { attachment: attachment },
      panelClass: 'app-same-day-view-attachment'
    });
  }

  public navigateTo(route?: string, params?: string): void {
    if (params) {
      switch (params) {
        case 'userNew':
        case 'userEdit':
        case 'userDriverValidate':
          this._router.navigate(['/users/list']);
          break;
        case 'register':
          this._router.navigate(['/login']);
          break;
      }
    } else {
      this._router.navigate([route]);
    }
  }

  private msgError(err) {
    const msg = this._functions.treatsErrorMessage('', err);
    this._modalAlertService.alertModal('Ops!', msg);
  }

  ngOnDestroy(): void {
    this.listenModalAlert.unsubscribe();
    this.listenAttachFile.unsubscribe();
  }
}