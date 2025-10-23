export class Document {
    cnhPhoto?: any[];
    driverPhoto?: any[];
    vehiclePhoto?: any[];
    antecedentPhoto?: any[];
    documentPhotoCRLV?: any[];
    photoOfProofOfAddress?: any[];
}

export class DocumentReset implements Document {
    cnhPhoto = [];
    driverPhoto = [];
    vehiclePhoto = [];
    antecedentPhoto = [];
    documentPhotoCRLV = [];
    photoOfProofOfAddress = [];
}