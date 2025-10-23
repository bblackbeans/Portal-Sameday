import { Injectable } from '@angular/core';
declare var Iugu:any;

@Injectable()
export class IuguService { 

  constructor() {
    Iugu.setAccountID("1FA1D6C61A5F4A89BB9BCE5118A84BE5");
    Iugu.setTestMode(true);
    Iugu.setup();
  }

  validateCreditCardNumber(number:string) {
    return Iugu.utils.validateCreditCardNumber(number);
  }

  validateCVV(number:string, brand:string) {
    return Iugu.utils.validateCVV(number, brand);
  }

  validateExpiration(month:number, year:number) {
    return Iugu.utils.validateExpiration(month, year);
  }

  getBrandByCreditCardNumber(number:string) {
    return Iugu.utils.getBrandByCreditCardNumber(number);
  }

  getCreditCardToken(number:string, expirateMonth:string, expirateYear:string, firstName:string, lastName:string, cvv:string):Promise<{success, tokenId}> {
    var cc = Iugu.CreditCard(number, expirateMonth, expirateYear, firstName, lastName, cvv);

    return new Promise(resolve => {
      Iugu.createPaymentToken(cc, (data) => {
        if (data.errors) {
          resolve({ success: false, tokenId: data.errors });
        } else {
          resolve({ success: true, tokenId: data });
        }
      })
    });
  }

}