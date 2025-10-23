import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phone'
})
export class PhonePipe implements PipeTransform {

  // Formatting
  transform(value: any): any {
    const t = value;
    // If there is no empty return phone
    if (!value) {
      return '';
      // Phone has 10 digits and has no formatting
    } else if (t.length === 10) {
      const format = '(' + t[0] + t[1] + ') ' + t[2] + t[3] + t[4] + t[5] + '-' + t[6] + t[7] + t[8] + t[9];
      return format;
      // Phone has 11 digits and has no formatting
    } else if (t.length === 11) {
      const format = '(' + t[0] + t[1] + ') ' + t[2] + t[3] + t[4] + t[5] + t[6] + '-' + t[7] + t[8] + t[9] + t[10];
      return format;
      // Phone has 10 digits and has formatting
    } else if (t.length === 14) {
      return value;
      // Phone has 11 digits and has formatting
    } else if (t.length === 15) {
      return value;
    }
  }

}