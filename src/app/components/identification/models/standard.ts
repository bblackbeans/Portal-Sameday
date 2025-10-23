import { Data, DataReset } from "./data";
import { Address, AddressReset } from "./address";
import { Contact, ContactReset } from "./contact";
import { Vehicle, VehicleReset } from "./vehicle";
import { Validate, ValidateReset } from "./validate";
import { Document, DocumentReset } from "./document";

export interface Standard {
    data?: Data;
    password?: string;
    address?: Address;
    contact?: Contact;
    vehicle?: Vehicle;
    validate?: Validate;
    documents?: Document;
    passwordAgain?: string;
    activatedUser?: boolean;
    termsAccepted?: boolean;
}

export class StandardReset implements Standard {
    password: string = null;
    data: Data = new DataReset;
    passwordAgain: string = null;
    termsAccepted: boolean = false;
    activatedUser: boolean = false;
    vehicle: Vehicle = new VehicleReset;
    address: Address = new AddressReset;
    contact: Contact = new ContactReset;
    validate: Validate = new ValidateReset;
    documents: Document = new DocumentReset;
}