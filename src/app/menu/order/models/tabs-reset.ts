import { Tabs } from './tabs';
import { Item } from './item';
import { pickupAndDestinationQuide, ResetPickupAndDestinationQuide } from './pickupAndDestinationQuide';

export class TabsReset implements Tabs {
    collectionSite: pickupAndDestinationQuide = new ResetPickupAndDestinationQuide;
    deliveryPlace: pickupAndDestinationQuide = new ResetPickupAndDestinationQuide;
    items: Array<Item> = [{
        name: null,
        model: null,
        width: null,
        conversion_width: null,
        height: null,
        conversion_height: null,
        length: null,
        conversion_length: null,
        weight: null,
        conversion_weight: null,
        quantity: null
    }];
    messageToDriver = null;
    summarize: any = {}
}