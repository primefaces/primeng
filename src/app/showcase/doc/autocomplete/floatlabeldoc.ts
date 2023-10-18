import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

interface AutoCompleteCompleteEvent {
    originalEvent: Event;
    query: string;
}

@Component({
    selector: 'float-label-doc',
    template: ` <section>
        <app-docsectiontext [title]="title" [id]="id">
            <p>A floating label appears on top of the input field when focused.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <span class="p-float-label">
                <p-autoComplete [(ngModel)]="selectedItem" [suggestions]="suggestions" (completeMethod)="search($event)" inputId="float-label"></p-autoComplete>
                <label for="float-label">Float Label</label>
            </span>
        </div>
        <app-code [code]="code" selector="autocomplete-float-label-demo"></app-code>
    </section>`
})
export class FloatLabelDoc {
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
<span class="p-float-label">
    <p-autoComplete [(ngModel)]="selectedItem" [suggestions]="suggestions" (completeMethod)="search($event)" inputId="float-label"></p-autoComplete>
    <label for="float-label">Float Label</label>
</span>`,

        html: `
<div class="card flex justify-content-center">
    <span class="p-float-label">
        <p-autoComplete [(ngModel)]="selectedItem" [suggestions]="suggestions" (completeMethod)="search($event)" inputId="float-label"></p-autoComplete>
        <label for="float-label">Float Label</label>
    </span>
</div>`,

        typescript: `
import { Component } from '@angular/core';

interface AutoCompleteCompleteEvent {
    originalEvent: Event;
    query: string;
}

@Component({
    selector: 'autocomplete-float-label-demo',
    templateUrl: './autocomplete-float-label-demo.html',
    styleUrls: ['./autocomplete-float-label-demo.scss']
})
export class AutocompleteFloatLabelDemo {
    items: any[] | undefined;

    selectedItem: any;

    suggestions: any[] | undefined;

    search(event: AutoCompleteCompleteEvent) {
        this.suggestions = [...Array(10).keys()].map(item => event.query + '-' + item);
    }
}`
    };
}
