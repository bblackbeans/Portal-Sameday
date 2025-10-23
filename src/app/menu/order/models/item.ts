export interface Item {
    name?: string;
    model?: string;
    width?: string;
    conversion_width?: string;
    height?: string;
    conversion_height?: string;
    length?: string;
    conversion_length?: string;
    weight?: string;
    conversion_weight?: string;
    quantity?: Number;
}

export class ResetItem implements Item {
    name = null;
    model = null;
    width = null;
    conversion_width = null;
    height = null;
    conversion_height = null;
    length = null;
    conversion_length = null;
    weight = null;
    conversion_weight = null;
    quantity = null;
}