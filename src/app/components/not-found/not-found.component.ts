import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { LoginService } from '../login/login.service';

declare const $: any;

@Component({
  selector: 'app-same-day-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {

  public allowsPreviousPage: boolean;

  constructor(
    private _location: Location,
    private _loginService: LoginService,
  ) {
    $('body').removeClass('authentication');
  }

  ngOnInit(): void {
    this.allowsPreviousPage = this._loginService.authenticatedUser();
  }

  previousPage() {
    if (this.allowsPreviousPage) {
      this._location.back();
    }
  }

  homePage() {
    this._loginService.exit();
  }

}