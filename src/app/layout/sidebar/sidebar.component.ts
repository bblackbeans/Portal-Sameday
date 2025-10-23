import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import * as moment from 'moment';
import { LoginService } from 'src/app/components/login/login.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {

  public file = [];
  public user: any = null;
  public menuItems: any[];
  public shift: string = '';
  private shifts: Subscription;

  constructor(
    private _loginService: LoginService,
  ) {
    this.shifts = interval(60 * 60 * 167).subscribe((() => {
      this.shift = this.checkShift();
    }))
  }

  ngOnInit() {
    this.shift = this.checkShift();

    // User
    this.user = this._loginService.getUser();

    if (this.user.avatar) {
      this.loadFile([{ url: this.user.avatar, idCloudinary: this.user.idCloudinaryAvatar }]);
    } else {
      this.loadFile([]);
    }

    // Modules
    const modules = this._loginService.getModules();
    this.menuItems = modules.filter(menuItem => menuItem['code'] ? menuItem : null);
  }

  private checkShift() {
    const currentTime = moment().format('HH');
    let nameShift = '';

    switch (currentTime) {
      case '00':
      case '01':
      case '02':
      case '03':
      case '04':
      case '05':
      case '06':
      case '07':
      case '08':
      case '09':
      case '10':
      case '11':
        nameShift = 'Bom dia!';
        break;
      case '12':
      case '13':
      case '14':
      case '15':
      case '16':
      case '17':
        nameShift = 'Boa tarde!';
        break;
      case '18':
      case '19':
      case '20':
      case '21':
      case '22':
      case '23':
        nameShift = 'Boa noite!';
        break;
    }

    return nameShift
  }

  public loadFile(e) {
    if (e.length) {
      this.user.avatar = e[0].url;
      this.user.idCloudinaryAvatar = e[0].idCloudinary;

      setTimeout(() => {
        this.file = e;
        this._loginService.setUser(this.user);
      }, 200);
    } else {
      this.file = [{ url: '/assets/img/noImage.png' }]
    }
  }

  public exit() {
    this._loginService.exit();
  }

  public ngOnDestroy() {
    this.shifts.unsubscribe();
  }

  toggleMenu(code) {
    document.getElementById(`sbmn-icon-${code}`).classList.toggle('fa-chevron-down');
    document.getElementById(`sbmn-icon-${code}`).classList.toggle('fa-chevron-up');
    document.getElementById(`sbmn-${code}`).classList.toggle('hidden');
  }
}