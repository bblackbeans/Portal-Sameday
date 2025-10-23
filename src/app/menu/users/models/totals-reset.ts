import { Totals } from "./totals";

export class TotalsReset implements Totals {
    statusAll = 0;
    statusUser = 0;
    statusDriver = 0;
    statusBusiness = 0;
    driverDocValido = 0;
    driverDocInvalido = 0;
}