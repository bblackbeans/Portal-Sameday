import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'converToKilometers',
})
export class KilometersPipe implements PipeTransform {
  transform(value: string): string {
    return value.replace(',00', ' km')
  }
}
