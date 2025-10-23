import { Component, Inject, OnInit } from '@angular/core';
import {MAT_BOTTOM_SHEET_DATA} from '@angular/material/bottom-sheet';
import { DynamicMessageService } from 'src/app/shared/dynamic-message.service';

@Component({
  selector: 'app-same-day-order-invoice',
  templateUrl: './order-invoice.component.html',
  styleUrls: ['./order-invoice.component.scss']
})
export class OrderInvoiceComponent implements OnInit {

  order:any = {};

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private _dynamicMessage: DynamicMessageService
  ) {}

  ngOnInit(): void {
    this.order = this.data.order
  }

  messageCopy() {
    this._dynamicMessage.open("Código copiado com sucesso");
  }

}
