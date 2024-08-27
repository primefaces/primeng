import { Component } from '@angular/core';
import { Code } from '@domain/code';

interface AutoCompleteCompleteEvent {
    originalEvent: Event;
    query: string;
}

@Component({
    selector: 'autocomplete-multiple-demo',
    template: ` <app-docsectiontext>
            <p>
                Multiple mode is enabled using <i>multiple</i> property used to select more than one value from the
                autocomplete. In this case, value reference should be an array.
            </p>
        </app-docsectiontext>
        <div class="card">
            <p-autoComplete
                [(ngModel)]="selectedItems"
                [suggestions]="items"
                (completeMethod)="search($event)"
                [multiple]="true"
                styleClass="w-full"
            />
        </div>
        <app-code [code]="code" selector="autocomplete-multiple-demo"></app-code>`,
})
export class MultipleDoc {
    selectedItems: any[] | undefined;

    items: any[] | undefined;

    search(event: AutoCompleteCompleteEvent) {
        this.items = [...Array(10).keys()].map((item) => event.query + '-' + item);
    }

    code: Code = {
        basic: `<p-autoComplete 
    [(ngModel)]="selectedItems" 
    [suggestions]="items" 
    (completeMethod)="search($event)" 
    [multiple]="true"
    styleClass="w-full" />`,

        html: `<div class="card">
    <p-autoComplete 
        [(ngModel)]="selectedItems" 
        [suggestions]="items" 
        (completeMethod)="search($event)" 
        [multiple]="true"
        styleClass="w-full" />
</div>`,

        typescript: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';

interface AutoCompleteCompleteEvent {
    originalEvent: Event;
    query: string;
}

@Component({
    selector: 'autocomplete-multiple-demo',
    templateUrl: './autocomplete-multiple-demo.html',
    standalone: true,
    imports: [FormsModule, AutoCompleteModule]
})
export class AutocompleteMultipleDemo {
    selectedItems: any[] | undefined;

    items: any[] | undefined;

    search(event: AutoCompleteCompleteEvent) {
        this.items = [...Array(10).keys()].map((item) => event.query + '-' + item);
    }
}`,
    };
}
