import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'convertFirstLetterWord'
})
export class ConvertFirstLetterWord implements PipeTransform {

    transform(value: string): string {
        if (!value) return '';

        let convert = '';
        const splitText = value.split(' ');

        splitText.forEach(word => {
            word = word.toLowerCase();

            if (!['', 'a', 'o', 'e', 'as', 'os', 'à', 'aos', 'às', 'ou', 'de', 'do', 'da', 'dos', 'das', 'um', 'uma', 'uns', 'umas', 'em', 'no', 'na', 'né', 'nos',
                'nas', 'num', 'numa', 'nuns', 'numas', 'dum', 'duma', 'duns', 'dumas', 'por', 'pela', 'pelo', 'pelos', 'pelas', 'para', 'pra',
            ].includes(word)) {
                convert += ` ${word.charAt(0).toUpperCase() + word.substr(1)} `;

            } else if (word) {
                convert += ` ${word} `;
            }
        });

        return convert.trim();
    }

}