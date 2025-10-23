import { location } from './../../menu/order/models/pickupAndDestinationQuide';
export class GmapsLegs {
    duration:string;
    distance:string;
}

export class GmapsAddress {
  number: string = '';
  address: string = '';
  city: string = '';
  district: string = '';
  zipCode: string = '';
  state: string = '';
  location: location = {
    lat: 0,
    lng: 0,
  }
}