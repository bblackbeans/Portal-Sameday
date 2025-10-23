export interface Contact {
    phone?: string;
    email?: string;
    urlSite?: string;
}

export class ContactReset implements Contact {
    phone = null;
    email = null;
    urlSite = null;
}