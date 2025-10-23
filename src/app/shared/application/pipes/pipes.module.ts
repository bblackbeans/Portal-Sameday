import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhonePipe } from '../../pipes/phone.pipe';
import { CnpjCpfPipe } from '../../pipes/cnpj-cpf.pipe';
import { ShortenNamePipe } from '../../pipes/shorten-name.pipe';
import { ConvertCentToCoin } from '../../pipes/convert-cent-to-coin.pipe';
import { ConvertFirstLetterWord } from '../../pipes/convert-first-letter-word.pipe';
import { HoursPipe } from '../../pipes/hours.pipe';
import { KilometersPipe } from '../../pipes/kilometers.pipe';

@NgModule({
  declarations: [
    PhonePipe,
    CnpjCpfPipe,
    ShortenNamePipe,
    ConvertCentToCoin,
    ConvertFirstLetterWord,
    HoursPipe,
    KilometersPipe
  ],
  exports: [
    PhonePipe,
    CnpjCpfPipe,
    ShortenNamePipe,
    ConvertCentToCoin,
    ConvertFirstLetterWord,
    HoursPipe,
    KilometersPipe
  ],
  imports: [
    CommonModule
  ]
})
export class PipesModule { }