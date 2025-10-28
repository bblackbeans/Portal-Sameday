import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { ModalAlertService } from 'src/app/shared/modal-alert.service';
import { LoginService } from 'src/app/components/login/login.service';
import { FunctionsService } from 'src/app/shared/functions.service';
import { TotalsReset } from '../models/totals-reset';
import { UsersService } from '../users.service';
import { Totals } from '../models/totals';

@Component({
  selector: 'app-same-day-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent implements OnInit {

  displayedColumns: string[] = ['typeUser', 'name', 'cpfcnpj', 'phone', 'status', 'actions'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();

  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild('sort') sort: MatSort;

  public selectedDriver: boolean = false;
  public pageLoading: boolean = false;
  public listLoading: boolean = false;
  public dataUsers: any;

  public totals: Totals = new TotalsReset();

  constructor(
    private _routerModule: Router,
    private _usersService: UsersService,
    private _loginService: LoginService,
    private _functions: FunctionsService,
    private _modalAlertService: ModalAlertService,
  ) { }

  ngOnInit(): void {
    this.getUsers('pageLoading');
    
    // Listener para o modal de confirmação
    this._modalAlertService.returnEvent.subscribe((returnModal) => {
      if (returnModal && returnModal.event === 'yes' && returnModal.action.action === 'excluirUsuario') {
        this._usersService.deleteUser(returnModal.action.value)
          .subscribe((x) => {
            if (x.status === 'success') {
              this._modalAlertService.alertModal('Sucesso!', 'Usuário excluído com sucesso.');
              this.getUsers('listLoading');
            } else if (x.status === 'error') {
              this.msgError(x);
            }
          }, (err) => {
            this.msgError(err);
          });
      }
    });
  }

  applyFilter(filterValue: string, action?: string) {
    filterValue = filterValue.trim();

    if (action) {
      this.selectedDriver = true;
      switch (action) {
        case 'driverFather':
          const array1 = this.dataUsers.filter((row) => row.typeUser === 'driver');
          this.clearAndLoadTable(false, array1);
          break;
        case 'driverSon':
          const array2 = this.dataUsers.filter((row) => row.typeUser === 'driver' && row.documentsValidated === filterValue);
          this.clearAndLoadTable(false, array2);
          break;
      }
    } else {
      this.selectedDriver = false;
      this.clearAndLoadTable(false);
      this.dataSource.filter = filterValue;
    }
  }

  getUsers(_loading): void {
    this[_loading] = true;
    this.totals = new TotalsReset();

    this._usersService.getUsers()
      .subscribe((x) => {
        if (x.status === 'success') {
          this.dataUsers = x.users;
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
        this.msgError(err);
        this[_loading] = false;
        this.clearAndLoadTable(true)
      });
  }

  editUser(_idUser?) {
    if (!_idUser) {
      this._routerModule.navigate(['/users/new'])

    } else {
      this._loginService.setIdSelectedUser(_idUser);
      this._routerModule.navigate(['/users/edit'])
    }
  }

  deleteUser(id) {
    this._modalAlertService.alertModal(
      'Confirmar Exclusão',
      'Tem certeza que deseja excluir este usuário? Esta ação não pode ser desfeita.',
      'yesno',
      'excluirUsuario',
      id
    );
  }

  validateDriver(_driver) {
    this._loginService.setIdSelectedUser(_driver.id);
    this._routerModule.navigate(['/users/driver/validate'])
  }

  loadCssStatus(status): String {
    let statusCss = '';

    switch (status) {
      case 'client':
        statusCss = 'statusUser';
        break;
      case 'business':
        statusCss = 'statusBusiness';
        break;
      case 'driver':
        statusCss = 'statusDriver';
        break;
    }

    return statusCss;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  clearAndLoadTable(clean: boolean, _array?) {
    this.dataSource = new MatTableDataSource(_array ? _array : clean ? [] : this.dataUsers);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  reload() {
    this.getUsers('listLoading');
  }

  private msgError(err) {
    const msg = this._functions.treatsErrorMessage('', err);
    this._modalAlertService.alertModal('Ops!', msg);
  }

}