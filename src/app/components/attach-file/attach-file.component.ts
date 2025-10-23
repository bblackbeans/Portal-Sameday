import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { saveAs as importedSaveAs } from 'file-saver';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { AttachFileService } from './attach-file.service';
import { FunctionsService } from 'src/app/shared/functions.service';
import { ModalAlertService } from 'src/app/shared/modal-alert.service';
import { ViewAttachmentComponent } from '../view-attachment/view-attachment.component';

declare var $: any;

@Component({
  selector: 'app-same-day-attach-file',
  templateUrl: './attach-file.component.html',
  styleUrls: ['./attach-file.component.scss']
})
export class AttachFileComponent implements OnInit, OnDestroy {

  @Input('limit') limit: string | number = 4;
  @Input('files') files: Array<any> = [];
  @Input('canAdd') canAdd: boolean = false;
  @Input('category') category: string = '';
  @Output('toSave') toSave = new EventEmitter();
  @Input('canDelete') canDelete: boolean = false;
  @Input('allowed') allowed = 'jpg|jpeg|png|jfif|pdf|txt|docx';

  public loading_profilePicture = false;
  public listenAttachFile: Subscription;

  constructor(
    private _modalAlertService: ModalAlertService,
    private _attachFileService: AttachFileService,
    private _functions: FunctionsService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.listenAttachFile = this._attachFileService.fileLoading_profilePicture.subscribe((action) => {
      this.loading_profilePicture = action;
    });
  }

  changeListener($event): void {
    this.readThis($event.target);
  }

  propagateChange = (_: any, fl: any) => {
    const imagem = _;
    if ((this.files.length + 1) <= this.limit) {
      this.category === 'profilePicture' ? this.addProfilePicture(imagem, fl) : this.add(imagem, fl);

    } else {
      this._modalAlertService.alertModal('Ops!', 'Número máximo de ' + this.limit + ' arquivos atingido!');
    }
  }

  readThis(inputValue: any): void {
    const file: File = inputValue.files[0];
    const myReader: FileReader = new FileReader();

    if (file) {
      myReader.onloadend = () => {
        this.propagateChange(myReader.result, file);
      };

      myReader.readAsDataURL(file);
    }
  }

  addProfilePicture(arquivo, fl) {
    const category = 'fileLoading_' + this.category;

    let file = {
      url: arquivo,
      idCloudinary: null,
    };

    const patt = new RegExp('.(' + this.allowed + ')');
    const res = patt.test(fl.name);

    if (res) {
      this._attachFileService[category].emit(true);
      this._attachFileService.putProfilePicture({ currentAvatar: this.files, url: arquivo })
        .subscribe((x) => {
          if (x.status === 'success') {
            this.files = [];
            file.url = x.data.url.secure_url;
            file.idCloudinary = x.data.url.public_id;

            this.files.push(file);
            this.toSave.emit(this.files);
            this._attachFileService[category].emit(false);
          } else if (x.status === 'error') {
            this._attachFileService[category].emit(false);
            this.msgError(x);
          }
        },
          (err) => {
            this._attachFileService[category].emit(false);
            this.msgError(err);
          });
    } else {
      this._modalAlertService.alertModal('Ops!', 'Esse tipo de arquivo não é válido!');
    }
  }

  add(arquivo, fl) {
    const category = 'fileLoading_' + this.category;

    let file = {
      name: fl.name,
      url: arquivo,
      dataCloudinary: null,
      idCloudinary: null
    };

    const patt = new RegExp('.(' + this.allowed + ')');
    const res = patt.test(fl.name);

    if (res) {
      this._attachFileService[category].emit(true);
      this._attachFileService.docUpload({ url: file.url })
        .subscribe((x) => {
          if (x.status === 'success') {
            file.dataCloudinary = x.data;
            file.url = x.data.url.secure_url;
            file.idCloudinary = x.data.url.public_id;

            this.files.push(file);

            this.toSave.emit(this.files);
            this._attachFileService[category].emit(false);
          } else if (x.status === 'error') {
            this._attachFileService[category].emit(false);
            this.msgError(x);
          }
        },
          (err) => {
            this._attachFileService[category].emit(false);
            this.msgError(err);
          });
    } else {
      this._modalAlertService.alertModal('Ops!', 'Esse tipo de arquivo não é válido!');
    }
  }

  downloadDoc(doc) {
    importedSaveAs(doc.url, doc.name);
  }

  seeAttached(_attachment: any) {
    _attachment.type = 'IMAGE';

    this.dialog.open(ViewAttachmentComponent, {
      width: '500px',
      data: { attachment: _attachment },
      panelClass: 'app-same-day-view-attachment'
    });
  }

  endpointDelete(file?, index?, action?) {
    let arrayIdsCloudinary = [];
    const category = 'fileLoading_' + this.category;
    this._attachFileService[category].emit(true);

    if (file) {
      arrayIdsCloudinary.push(file.idCloudinary);

    } else {
      this.files.forEach(file => {
        arrayIdsCloudinary.push(file.idCloudinary);
      });
    }

    this._attachFileService.docDestroy(arrayIdsCloudinary)
      .subscribe((x) => {
        if (x.status === 'success') {
          if (action === 'deleteAll') {
            this.files = [];
          } else {
            this.files.splice(index, 1);
          }
          this.toSave.emit(this.files);
          this._attachFileService[category].emit(false);
        } else if (x.status === 'error') {
          this._attachFileService[category].emit(false);
          this.msgError(x);
        }
      },
        (err) => {
          this._attachFileService[category].emit(false);
          this.msgError(err);
        });
  }

  public loadCssStatus(status, category?, classCategory?): String {
    let statusCss = '';

    if (status && category && classCategory) {
      statusCss = classCategory === 'content' ? 'contentProfilePicture' : 'overlayProfilePicture';
    }

    return statusCss;
  }

  private msgError(err) {
    const msg = this._functions.treatsErrorMessage('', err);
    this._modalAlertService.alertModal('Ops!', msg);
  }

  public ngOnDestroy() {
    this.listenAttachFile.unsubscribe();
  }
}