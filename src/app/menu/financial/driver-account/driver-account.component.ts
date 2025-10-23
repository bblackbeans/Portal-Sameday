import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-same-day-driver-account',
  templateUrl: './driver-account.component.html',
  styleUrls: ['./driver-account.component.scss']
})
export class DriverAccountComponent implements OnInit {

  pageLoading: boolean = false;
  constructor() { }

  bankData = {
    bank: "0",
    agency: "0",
    account: "0",
    accountDigit: "0"
  }

  ngOnInit(): void {
  }

}
