import { Component } from '@angular/core';
import { Code } from '../../domain/code';

interface AutoCompleteCompleteEvent {
    originalEvent: Event;
    query: string;
}

@Component({
    selector: 'autocomplete-multiple-demo',
    template: ` <app-docsectiontext>
            <p>Multiple mode is enabled using <i>multiple</i> property used to select more than one value from the autocomplete. In this case, value reference should be an array.</p>
        </app-docsectiontext>
        <div class="card">
            <span class="p-fluid">
                <p-autoComplete [(ngModel)]="selectedItems" [suggestions]="items" (completeMethod)="search($event)" [multiple]="true" placeholder="Search"></p-autoComplete>
            </span>
        </div>
        <app-code [code]="code" selector="autocomplete-multiple-demo"></app-code>`
})
export class MultipleDoc {
    selectedItems: any[] | undefined;

    items: any[] | undefined;

    search(event: AutoCompleteCompleteEvent) {
        this.items = [...Array(10).keys()].map((item) => event.query + '-' + item);
    }

    code: Code = {
        basic: `<span class="p-fluid">
    <p-autoComplete [(ngModel)]="selectedItems" [suggestions]="items" (completeMethod)="filterCountry($event)" [multiple]="true"></p-autoComplete>
</span>`,

        html: `
<div class="card">
    <span class="p-fluid">
        <p-autoComplete [(ngModel)]="selectedItems" [suggestions]="items" (completeMethod)="filterCountry($event)" [multiple]="true"></p-autoComplete>
    </span>
</div>`,

        typescript: `
import { Component } from '@angular/core';

interface AutoCompleteCompleteEvent {
    originalEvent: Event;
    query: string;
}

@Component({
    selector: 'autocomplete-multiple-demo',
    templateUrl: './autocomplete-multiple-demo.html'
})
export class AutocompleteMultipleDemo {
    selectedItems: any[] | undefined;

    items: any[] | undefined;

    search(event: AutoCompleteCompleteEvent) {
        this.items = [...Array(10).keys()].map((item) => event.query + '-' + item);
    }
}`
    };
}
