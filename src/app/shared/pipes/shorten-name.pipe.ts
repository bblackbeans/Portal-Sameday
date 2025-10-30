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
    const safeValue = typeof value === 'string' ? value : '';
    const spl = safeValue ? safeValue.split(' ') : [];

    const shortened = spl.length > 1 ? `${spl[0]} ${spl[spl.length - 1]}` : safeValue;
    return this._functionsService.convertFirstLetterWord(shortened);
  }

}