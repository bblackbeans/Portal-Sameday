import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'converToHours',
})
export class HoursPipe implements PipeTransform {
  transform(value: number): string {
    return `${value}h`;
  }
}
