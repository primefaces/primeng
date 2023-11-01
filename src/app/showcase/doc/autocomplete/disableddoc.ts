import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

interface AutoCompleteCompleteEvent {
    originalEvent: Event;
    query: string;
}

@Component({
    selector: 'disabled-doc',
    template: ` <section>
        <app-docsectiontext [title]="title" [id]="id">
            <p>When <i>disabled</i> is present, the element cannot be edited and focused.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-autoComplete [(ngModel)]="selectedItem" [suggestions]="suggestions" (completeMethod)="search($event)" [disabled]="true"></p-autoComplete>
        </div>
        <app-code [code]="code" selector="autocomplete-disabled-demo"></app-code>
    </section>`
})
export class DisabledDoc {
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
<p-autoComplete [(ngModel)]="selectedItem" [suggestions]="suggestions" (completeMethod)="search($event)" [disabled]="true"></p-autoComplete>`,

        html: `
<div class="card flex justify-content-center">
    <p-autoComplete [(ngModel)]="selectedItem" [suggestions]="suggestions" (completeMethod)="search($event)" [disabled]="true"></p-autoComplete>
</div>`,

        typescript: `
import { Component } from '@angular/core';

interface AutoCompleteCompleteEvent {
    originalEvent: Event;
    query: string;
}

@Component({
    selector: 'autocomplete-disabled-demo',
    templateUrl: './autocomplete-disabled-demo.html',
    styleUrls: ['./autocomplete-disabled-demo.scss']
})
export class AutocompleteDisabledDemo {
    items: any[] | undefined;

    selectedItem: any;

    suggestions: any[] | undefined;

    search(event: AutoCompleteCompleteEvent) {
        this.suggestions = [...Array(10).keys()].map(item => event.query + '-' + item);
    }
}`
    };
}
