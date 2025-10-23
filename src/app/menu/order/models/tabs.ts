import { Item } from './item';
import { pickupAndDestinationQuide } from './pickupAndDestinationQuide';

export class Tabs {
    summarize?: any;
    items?: Array<Item>;
    messageToDriver?: String;
    deliveryPlace?: pickupAndDestinationQuide;
    collectionSite?: pickupAndDestinationQuide; 
}