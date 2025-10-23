export class CreditCard {
    constructor() {
      this.number = 0;
    }
    number: number;
    verifiedCode: number;
    name: string;
    brand: string;
    expireMonth: number;
    expireYear: number;
}

export enum CreditCardInvalid {
  number = 'Número do cartão é inválido',
  verification_value = 'Cód. de segurança do cartão é inválido',
  expiration = 'Vencimento do cartão é inválido',
  first_name = 'Nome no cartão é inválido',
  last_name = 'Nome no cartão é inválido',
}