import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'convertCentToCoin'
})
export class ConvertCentToCoin implements PipeTransform {

    transform(value: string): string {
        if (!value) return 'R$ 0,00';

        if (!(value.indexOf(',') !== -1) && !(value.indexOf('.') !== -1)) {
            value = `${value},00`;
        }

        value = Number(value.replace(',', '').replace('.', '')).toString().padStart(3, '0');

        const centsIndex = value.length - 2;
        const thousandIndex = value.length - 5;
        const millionIndex = value.length - 8;

        if (millionIndex > 0) {
            value =
                value.substring(0, millionIndex) +
                '.' +
                value.substring(millionIndex, thousandIndex) +
                '.' +
                value.substring(thousandIndex, centsIndex) +
                ',' +
                value.substring(centsIndex);
        } else if (thousandIndex > 0) {
            value =
                value.substring(0, thousandIndex) +
                '.' +
                value.substring(thousandIndex, centsIndex) +
                ',' +
                value.substring(centsIndex);
        } else {
            value = value.substring(0, centsIndex) + ',' + value.substring(centsIndex);
        }

        return `R$ ${value}`;
    }

}