import { Code } from '@/domain/code';
import { Component } from '@angular/core';

interface AutoCompleteCompleteEvent {
    originalEvent: Event;
    query: string;
}

@Component({
    selector: 'dropdown-doc',
    template: ` <app-docsectiontext>
            <p>
                Enabling <i>dropdown</i> property displays a button next to the input field where click behavior of the button is defined using <i>dropdownMode</i> property that takes <strong>blank</strong> or <strong>current</strong> as possible
                values. <i>blank</i> is the default mode to send a query with an empty string whereas <i>current</i> setting sends a query with the current value of the input.
            </p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-autocomplete [(ngModel)]="value" [dropdown]="true" [suggestions]="items" (completeMethod)="search($event)" />
        </div>
        <app-code [code]="code" selector="autocomplete-dropdown-demo"></app-code>`
})
export class DropdownDoc {
    items: any[] | undefined;

    value: any;
    code: Code = {
        basic: `<p-autocomplete [(ngModel)]="value" [dropdown]="true" [suggestions]="items" (completeMethod)="search($event)" />`,

        html: `<div class="card flex justify-center">
    <p-autocomplete [(ngModel)]="value" [dropdown]="true" [suggestions]="items" (completeMethod)="search($event)" />
</div>`,

        typescript: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';

interface AutoCompleteCompleteEvent {
    originalEvent: Event;
    query: string;
}

@Component({
    selector: 'autocomplete-dropdown-demo',
    templateUrl: './autocomplete-dropdown-demo.html',
    standalone:true,
    imports: [FormsModule, AutoCompleteModule]
})
export class AutocompleteDropdownDemo implements OnInit {
    items: any[] | undefined;

    value: any;

    search(event: AutoCompleteCompleteEvent) {
    let _items = [...Array(10).keys()];

    this.items = event.query ? [...Array(10).keys()].map((item) => event.query + '-' + item) : _items;
    }
}`
    };

    search(event: AutoCompleteCompleteEvent) {
        let _items = [...Array(10).keys()];

        this.items = event.query ? [...Array(10).keys()].map((item) => event.query + '-' + item) : _items;
    }
}
