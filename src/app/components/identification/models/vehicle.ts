export interface Vehicle {
    year?: string;
    brand?: string;
    model?: string;
    color?: string;
    plate?: string;
    renavam?: string;
    category?: string;
    width?: number | string;
    conversion_width?: number | string;
    height?: number | string;
    conversion_height?: number | string;
    length?: number | string;
    conversion_length?: number | string;
    weight?: number | string;
    conversion_weight?: number | string;
}

export class VehicleReset implements Vehicle {
    year = null;
    brand = null;
    model = null;
    color = null;
    plate = null;
    renavam = null;
    category = null;
    width = null;
    conversion_width = null;
    height = null;
    conversion_height = null;
    length = null;
    conversion_length = null;
    weight = null;
    conversion_weight = null;
}