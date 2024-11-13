import { Code } from '@/domain/code';
import { Component } from '@angular/core';

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
            <label for="multiple-ac-1" class="font-bold mb-2 block">With Typeahead</label>
            <p-autocomplete [(ngModel)]="value1" inputId="multiple-ac-1" multiple fluid [suggestions]="items" (completeMethod)="search($event)" />

            <label for="multiple-ac-2" class="font-bold mt-8 mb-2 block">Without Typeahead</label>
            <p-autocomplete [(ngModel)]="value2" inputId="multiple-ac-2" multiple fluid (completeMethod)="search($event)" [typeahead]="false" />
        </div>
        <app-code [code]="code" selector="autocomplete-multiple-demo"></app-code>`
})
export class MultipleDoc {
    value1: any[] | undefined;

    value2: any[] | undefined;

    items: any[] | undefined;

    search(event: AutoCompleteCompleteEvent) {
        this.items = [...Array(10).keys()].map((item) => event.query + '-' + item);
    }

    code: Code = {
        basic: `<label for="multiple-ac-1" class="font-bold mb-2 block">With Typeahead</label>
<p-autocomplete [(ngModel)]="value1" inputId="multiple-ac-1" multiple fluid [suggestions]="items" (completeMethod)="search($event)" />

<label for="multiple-ac-2" class="font-bold mt-8 mb-2 block">Without Typeahead</label>
<p-autocomplete [(ngModel)]="value2" inputId="multiple-ac-2" multiple fluid (completeMethod)="search($event)" [typeahead]="false" />`,

        html: `<div class="card">
    <label for="multiple-ac-1" class="font-bold mb-2 block">With Typeahead</label>
    <p-autocomplete [(ngModel)]="value1" inputId="multiple-ac-1" multiple fluid [suggestions]="items" (completeMethod)="search($event)" />

    <label for="multiple-ac-2" class="font-bold mt-8 mb-2 block">Without Typeahead</label>
    <p-autocomplete [(ngModel)]="value2" inputId="multiple-ac-2" multiple fluid (completeMethod)="search($event)" [typeahead]="false" />
</div>`,

        typescript: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AutoComplete } from 'primeng/autocomplete';

interface AutoCompleteCompleteEvent {
    originalEvent: Event;
    query: string;
}

@Component({
    selector: 'autocomplete-multiple-demo',
    templateUrl: './autocomplete-multiple-demo.html',
    standalone: true,
    imports: [FormsModule, AutoComplete]
})
export class AutocompleteMultipleDemo {
    value1: any[] | undefined;

    value2: any[] | undefined;

    items: any[] | undefined;

    search(event: AutoCompleteCompleteEvent) {
        this.items = [...Array(10).keys()].map((item) => event.query + '-' + item);
    }
}`
    };
}
