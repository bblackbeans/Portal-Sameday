import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/components/login/login.service';

@Component({
  selector: 'app-same-day-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(
    private _loginService: LoginService,
  ) { }

  ngOnInit(): void {
    if (this._loginService.authenticatedUser()) {
      this._loginService.logoff();
    }
  }

}