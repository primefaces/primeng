import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'custom-constraints-doc',
    template: ` <section class="py-3">
        <app-docsectiontext [title]="title" [id]="id">
            <p>FilterService can be extended by adding new constraints using the <span>register</span> function.</p></app-docsectiontext
        >
        <app-code [code]="code" [hideToggleCode]="true"></app-code>
    </section>`
})
export class CustomConstraintsDoc {
    @Input() id: string;

    @Input() title: string;

    code: Code = {
        typescript: `this.filterService.register('isPrimeNumber', (value, filter): boolean => {
    if (filter === undefined || filter === null || filter.trim() === '') {
        return true;
    }

    if (value === undefined || value === null) {
        return false;
    }

    return value.toString() === filter.toString();
});

this.filterService.filters['isPrimeNumber'](3);                      //true
this.filterService.filters['isPrimeNumber'](5);                      //true
this.filterService.filters['isPrimeNumber'](568985673);              //false`
    };
}
