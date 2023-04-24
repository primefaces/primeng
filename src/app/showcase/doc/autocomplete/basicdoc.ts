import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'basic-doc',
    template: ` <section>
        <app-docsectiontext [title]="title" [id]="id">
            <p>
                AutoComplete uses <i>ngModel</i> for two-way binding, requires a list of suggestions and a <i>completeMethod</i> to query for the results. The completeMethod gets the query text as <i>event.query</i> property and should update the
                suggestions with the search results.
            </p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-autoComplete [(ngModel)]="selectedItem" [suggestions]="suggestions" (completeMethod)="search($event)"></p-autoComplete>
        </div>
        <app-code [code]="code" selector="autocomplete-basic-demo"></app-code>
    </section>`
})
export class BasicDoc {
    @Input() id: string;

    @Input() title: string;

    items: any[];

    selectedItem: any;

    suggestions: any[];

    search(event) {
        this.suggestions = [...Array(10).keys()].map((item) => event.query + '-' + item);
    }

    code: Code = {
        basic: `
<p-autoComplete [(ngModel)]="selectedItem" [suggestions]="suggestions" (completeMethod)="search($event)"></p-autoComplete>`,

        html: `
<div class="card flex justify-content-center">
    <p-autoComplete [(ngModel)]="selectedItem" [suggestions]="suggestions" (completeMethod)="search($event)"></p-autoComplete>
</div>`,

        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'autocomplete-basic-demo',
    templateUrl: './autocomplete-basic-demo.html'
})
export class AutocompleteBasicDemo {
    items: any[];

    selectedItem: any;

    suggestions: any[];

    search(event) {
        this.suggestions = [...Array(10).keys()].map(item => event.query + '-' + item);
    }
}`
    };
}
