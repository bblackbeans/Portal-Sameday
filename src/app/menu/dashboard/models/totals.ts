export interface Totals {
    kms?: Number;
    driver?: Number;
    client?: Number;
    goodsDelivered?: Number;
}

export class TotalsReset implements Totals {
    kms = 0;
    driver = 0;
    client = 0;
    goodsDelivered = 0;
}