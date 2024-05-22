import { Component } from '@angular/core';
import { Code } from '@domain/code';

interface AutoCompleteCompleteEvent {
    originalEvent: Event;
    query: string;
}

@Component({
    selector: 'disabled-doc',
    template: ` <app-docsectiontext>
            <p>When <i>disabled</i> is present, the element cannot be edited and focused.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-autoComplete [(ngModel)]="selectedItem" [suggestions]="suggestions" placeholder="Search" (completeMethod)="search($event)" [disabled]="true" />
        </div>
        <app-code [code]="code" selector="autocomplete-disabled-demo"></app-code>`
})
export class DisabledDoc {
    items: any[] | undefined;

    selectedItem: any;

    suggestions: any[] | undefined;

    search(event: AutoCompleteCompleteEvent) {
        this.suggestions = [...Array(10).keys()].map((item) => event.query + '-' + item);
    }

    code: Code = {
        basic: `<p-autoComplete 
    [(ngModel)]="selectedItem" 
    [suggestions]="suggestions"
    (completeMethod)="search($event)" 
    [disabled]="true" />`,

        html: `<div class="card flex justify-content-center">
    <p-autoComplete 
        [(ngModel)]="selectedItem" 
        [suggestions]="suggestions" 
        (completeMethod)="search($event)" 
        [disabled]="true" />
</div>`,

        typescript: `import { Component } from '@angular/core';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FormsModule } from '@angular/forms';

interface AutoCompleteCompleteEvent {
    originalEvent: Event;
    query: string;
}

@Component({
    selector: 'autocomplete-disabled-demo',
    templateUrl: './autocomplete-disabled-demo.html',
    standalone: true,
    imports: [FormsModule, AutoCompleteModule]
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
