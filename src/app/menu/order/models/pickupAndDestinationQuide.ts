export interface location {
    lat?: string | Number;
    lng?: string | Number;
}

export interface pickupAndDestinationQuide {
    typeUser?: string;
    name?: string;
    cpfcnpj?: string;
    fantasyName?: string;
    phone?: string;
    email?: string;
    city?: string;
    state?: string;
    number?: string;
    zipCode?: string;
    address?: string;
    district?: string;
    location?: location;
    complement?: string;
}

export class ResetPickupAndDestinationQuide implements pickupAndDestinationQuide {
    typeUser = null;
    name = null;
    cpfcnpj = null;
    fantasyName = null;
    phone = null;
    email = null;
    city = null;
    state = null;
    number = null;
    zipCode = null;
    address = null;
    district = null;
    complement = null;
    location: location = {
        lat: null,
        lng: null
    }
}