import { Data, DataReset } from './data';
import { Address, AddressReset } from './address';
import { Contact, ContactReset } from './contact';

export interface Client {
    data?: Data;
    address?: Address;
    contact?: Contact;
    password?: string;
    passwordAgain?: string;
    termsAccepted?: boolean;
    activatedUser?: boolean;
}

export class ClientReset implements Client {
    password: string = null;
    data: Data = new DataReset;
    passwordAgain: string = null;
    termsAccepted: boolean = false;
    activatedUser: boolean = false;
    address: Address = new AddressReset;
    contact: Contact = new ContactReset;
}