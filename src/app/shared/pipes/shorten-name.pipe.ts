import { Pipe, PipeTransform } from '@angular/core';
import { FunctionsService } from '../functions.service';

@Pipe({
  name: 'shortenName'
})
export class ShortenNamePipe implements PipeTransform {

  constructor(
    private _functionsService: FunctionsService
  ) { }

  transform(value: string): string {
    const spl = value ? value.split(' ') : '';

    return this._functionsService.convertFirstLetterWord(spl.length > 1 ? spl[0] + ' ' + spl[spl.length - 1] : value);
  }

}