import { Component } from '@angular/core';
import { Code } from '@domain/code';

interface AutoCompleteCompleteEvent {
    originalEvent: Event;
    query: string;
}

@Component({
    selector: 'invalid-doc',
    template: ` <app-docsectiontext>
            <p>Invalid state style is added using the <i>ng-invalid</i> and <i>ng-dirty</i> class to indicate a failed validation.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-autoComplete [(ngModel)]="selectedItem" [suggestions]="suggestions" class="ng-invalid ng-dirty" (completeMethod)="search($event)"/>
        </div>
        <app-code [code]="code" selector="autocomplete-invalid-demo"></app-code>`
})
export class InvalidDoc {
    items: any[] | undefined;

    selectedItem: any;

    suggestions: any[] | undefined;

    search(event: AutoCompleteCompleteEvent) {
        this.suggestions = [...Array(10).keys()].map((item) => event.query + '-' + item);
    }

    code: Code = {
        basic: `<p-autoComplete
    class="ng-invalid ng-dirty" 
    [(ngModel)]="selectedItem" 
    [suggestions]="suggestions" 
    (completeMethod)="search($event)"/>`,

        html: `<div class="card flex justify-content-center">
    <p-autoComplete 
        class="ng-invalid ng-dirty" 
        [(ngModel)]="selectedItem" 
        [suggestions]="suggestions" 
        (completeMethod)="search($event)"/>
</div>`,

        typescript: `
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';

interface AutoCompleteCompleteEvent {
    originalEvent: Event;
    query: string;
}

@Component({
    selector: 'autocomplete-invalid-demo',
    templateUrl: './autocomplete-invalid-demo.html',
    standalone: true,
    imports: [FormsModule, AutoCompleteModule]
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
