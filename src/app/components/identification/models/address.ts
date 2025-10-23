export interface Address {
    zipCode?: string;
    address?: string;
    number?: string;
    complement?: string;
    district?: string;
    state?: string;
    city?: string;
}

export class AddressReset implements Address {
    zipCode = null;
    address = null;
    number = null;
    complement = null;
    district = null;
    state = null;
    city = null;
}