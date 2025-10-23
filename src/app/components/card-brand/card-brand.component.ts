import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'card-brand',
  templateUrl: './card-brand.component.html',
  styleUrls: ['./card-brand.component.scss']
})
export class CardBrandComponent implements OnInit {

  @Input() cardNumber: string;
  @Input() cardBrand: string;

  constructor() { }
  ngOnInit() { }

  getBrand() {
    let code = this.cardNumber[0];
    let brand = '';

    if(code == '4') brand = 'visa'
    else if (code == '5') brand = 'master'
    else if (code == '6') brand = 'discover'
    else if (code == '3') brand = 'american-express'

    return this.cardBrand ?? brand;
  }
}