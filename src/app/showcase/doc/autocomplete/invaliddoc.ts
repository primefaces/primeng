import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

interface AutoCompleteCompleteEvent {
    originalEvent: Event;
    query: string;
}

@Component({
    selector: 'invalid-doc',
    template: ` <section>
        <app-docsectiontext [title]="title" [id]="id">
            <p>Invalid state style is added using the <i>ng-invalid</i> and <i>ng-dirty</i> class to indicate a failed validation.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-autoComplete [(ngModel)]="selectedItem" [suggestions]="suggestions" class="ng-invalid ng-dirty" (completeMethod)="search($event)"></p-autoComplete>
        </div>
        <app-code [code]="code" selector="autocomplete-invalid-demo"></app-code>
    </section>`
})
export class InvalidDoc {
    @Input() id: string;

    @Input() title: string;

    items: any[] | undefined;

    selectedItem: any;

    suggestions: any[] | undefined;

    search(event: AutoCompleteCompleteEvent) {
        this.suggestions = [...Array(10).keys()].map((item) => event.query + '-' + item);
    }

    code: Code = {
        basic: `
<p-autoComplete [(ngModel)]="selectedItem" [suggestions]="suggestions" class="ng-invalid ng-dirty" (completeMethod)="search($event)"></p-autoComplete>`,

        html: `
<div class="card flex justify-content-center">
    <p-autoComplete [(ngModel)]="selectedItem" [suggestions]="suggestions" class="ng-invalid ng-dirty" (completeMethod)="search($event)"></p-autoComplete>
</div>`,

        typescript: `
import { Component } from '@angular/core';

interface AutoCompleteCompleteEvent {
    originalEvent: Event;
    query: string;
}

@Component({
    selector: 'autocomplete-invalid-demo',
    templateUrl: './autocomplete-invalid-demo.html',
    styleUrls: ['./autocomplete-invalid-demo.scss']
})
export class AutocompleteInvalidDemo {
    items: any[] | undefined;

    selectedItem: any;

    suggestions: any[] | undefined;

    search(event: AutoCompleteCompleteEvent) {
        this.suggestions = [...Array(10).keys()].map(item => event.query + '-' + item);
    }
}`
    };
}
