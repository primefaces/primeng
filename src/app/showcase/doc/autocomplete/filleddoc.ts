import { Component } from '@angular/core';
import { Code } from '@domain/code';

interface AutoCompleteCompleteEvent {
    originalEvent: Event;
    query: string;
}

@Component({
    selector: 'filled-doc',
    template: ` <app-docsectiontext>
            <p>Specify the <i>variant</i> property as <i>filled</i> to display the component with a higher visual emphasis than the default <i>outlined</i> style.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-autoComplete [(ngModel)]="selectedItem" [suggestions]="suggestions" (completeMethod)="search($event)" variant="filled"/>
        </div>
        <app-code [code]="code" selector="autocomplete-filled-demo"></app-code>`
})
export class FilledDoc {
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
    variant="filled" />`,

        html: `<div class="card flex justify-content-center">
    <p-autoComplete
        [(ngModel)]="selectedItem"
        [suggestions]="suggestions"
        (completeMethod)="search($event)"
        variant="filled" />
</div>`,

        typescript: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';

interface AutoCompleteCompleteEvent {
    originalEvent: Event;
    query: string;
}

@Component({
    selector: 'autocomplete-filled-demo',
    templateUrl: './autocomplete-filled-demo.html',
    imports: [AutoCompleteModule, FormsModule],
    standalone: true,
})
export class AutocompleteFilledDemo {
    items: any[] | undefined;

    selectedItem: any;

    suggestions: any[] | undefined;

    search(event: AutoCompleteCompleteEvent) {
        this.suggestions = [...Array(10).keys()].map(item => event.query + '-' + item);
    }
}`
    };
}
