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
    selector: 'fluid-doc',
    standalone: true,
    imports: [FormsModule, AutoCompleteModule, AppDocSectionText, AppCode],
    template: ` <app-docsectiontext>
            <p>The fluid prop makes the component take up the full width of its container when set to true.</p>
        </app-docsectiontext>
        <div class="card">
            <p-autocomplete [(ngModel)]="value" [suggestions]="items" (completeMethod)="search($event)" fluid />
        </div>
        <app-code [code]="code" selector="autocomplete-fluid-demo"></app-code>`
})
export class FluidDoc {
    items: any[] = [];

    value: any;

    code: Code = {
        basic: `<p-autocomplete [(ngModel)]="value" [suggestions]="items" (completeMethod)="search($event)" fluid />`,

        html: `<div class="card">
    <p-autocomplete [(ngModel)]="value" [suggestions]="items" (completeMethod)="search($event)" fluid />
</div>`,

        typescript: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AutoComplete } from 'primeng/autocomplete';

interface AutoCompleteCompleteEvent {
    originalEvent: Event;
    query: string;
}

@Component({
    selector: 'autocomplete-fluid-demo',
    templateUrl: './autocomplete-fluid-demo.html',
    imports: [AutoComplete, FormsModule],
    standalone: true,
})
export class AutocompleteFluidDemo {
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
