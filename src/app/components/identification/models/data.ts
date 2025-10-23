export interface Data {
    name?: string;
    cpfcnpj?: string;
    fantasyName?: string;
}

export class DataReset implements Data {
    name = null;
    cpfcnpj = null;
    fantasyName = null;
}