import { Code } from '@/domain/code';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { AppCode } from '@/components/doc/app.code';

interface AutoCompleteCompleteEvent {
    originalEvent: Event;
    query: string;
}

@Component({
    selector: 'basic-doc',
    standalone: true,
    imports: [CommonModule, FormsModule, AutoCompleteModule, AppDocSectionText, AppCode],
    template: ` <app-docsectiontext>
            <p>
                AutoComplete uses <i>ngModel</i> for two-way binding, requires a list of suggestions and a <i>completeMethod</i> to query for the results. The completeMethod gets the query text as <i>event.query</i> property and should update the
                suggestions with the search results.
            </p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-autocomplete [(ngModel)]="value" [suggestions]="items" (completeMethod)="search($event)" />
        </div>
        <app-code [code]="code" selector="autocomplete-basic-demo"></app-code>`
})
export class BasicDoc {
    items: any[] = [];

    value: any;
    code: Code = {
        basic: `<p-autocomplete [(ngModel)]="value" [suggestions]="items" (completeMethod)="search($event)" />`,

        html: `<div class="card flex justify-center">
    <p-autocomplete [(ngModel)]="value" [suggestions]="items" (completeMethod)="search($event)" />
</div>`,

        typescript: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AutoComplete } from 'primeng/autocomplete';

interface AutoCompleteCompleteEvent {
    originalEvent: Event;
    query: string;
}

@Component({
    selector: 'autocomplete-basic-demo',
    templateUrl: './autocomplete-basic-demo.html',
    imports: [AutoComplete, FormsModule],
    standalone: true,
})
export class AutocompleteBasicDemo {
    items: any[] = [];

    value: any;

    search(event: AutoCompleteCompleteEvent) {
        this.items = [...Array(10).keys()].map(item => event.query + '-' + item);
    }
}`
    };

    search(event: AutoCompleteCompleteEvent) {
        this.items = [...Array(10).keys()].map((item) => event.query + '-' + item);
    }
}
