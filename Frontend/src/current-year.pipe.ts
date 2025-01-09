import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'currentYear'
})
export class CurrentYearPipe implements PipeTransform {
    transform(): number {
        return new Date().getFullYear();
    }
}
