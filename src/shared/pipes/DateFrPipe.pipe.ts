import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

const MONTHS_LONG = [null,
    "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
    "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];

@Pipe({
    name: 'datefr',
})
export class DateFrPipe implements PipeTransform {

    constructor(private datePipe: DatePipe) {}

    transform(value: Date, format: string): string {
        const month = Number.parseInt(this.datePipe.transform(value, 'M'));

        let form = format.replace(/MMMM/g, '§§');
        form = form.replace(/MMM/g, '§');

        let result = this.datePipe.transform(value, form);

        result = result.replace('§§', MONTHS_LONG[month]);
        result = result.replace('§', this.shortMonth(month));

        return result;
    }

    private shortMonth(monthNb: number): string {
        const m = MONTHS_LONG[monthNb];
        if (m.length > 5) {
            return m.slice(0, 3);
        }
        return m;
    }

}
