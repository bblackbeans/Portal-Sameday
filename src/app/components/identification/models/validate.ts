export interface Row {
    id?: string;
    idUser?: string;
    status?: string;
    reason?: string;
    category?: string;
}

export class RowReset implements Row {
    id = null;
    idUser = null;
    status = null;
    reason = null;
    category = null;
}

export interface Validate {
    cnhPhoto?: Row;
    driverPhoto?: Row;
    vehiclePhoto?: Row;
    antecedentPhoto?: Row;
    documentPhotoCRLV?: Row;
    photoOfProofOfAddress?: Row;
}

export class ValidateReset implements Validate {
    cnhPhoto: Row = new RowReset;
    driverPhoto: Row = new RowReset;
    vehiclePhoto: Row = new RowReset;
    antecedentPhoto: Row = new RowReset;
    documentPhotoCRLV: Row = new RowReset;
    photoOfProofOfAddress: Row = new RowReset;
}