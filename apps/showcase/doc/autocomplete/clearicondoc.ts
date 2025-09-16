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
    selector: 'clear-icon-doc',
    standalone: true,
    imports: [FormsModule, AutoCompleteModule, AppDocSectionText, AppCode],
    template: ` <app-docsectiontext>
            <p>When <i>showClear</i> is enabled, a clear icon is displayed to clear the value.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-autocomplete [(ngModel)]="value" [suggestions]="items" (completeMethod)="search($event)" [showClear]="true" />
        </div>
        <app-code [code]="code" selector="autocomplete-clear-icon-demo"></app-code>`
})
export class ClearIconDoc {
    items: any[] = [];

    value: any;

    code: Code = {
        basic: `<p-autocomplete [(ngModel)]="value" [suggestions]="items" (completeMethod)="search($event)" [showClear]="true" />`,

        html: `<div class="card flex justify-center">
    <p-autocomplete [(ngModel)]="value" [suggestions]="items" (completeMethod)="search($event)" [showClear]="true" />
</div>`,

        typescript: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AutoComplete } from 'primeng/autocomplete';

interface AutoCompleteCompleteEvent {
    originalEvent: Event;
    query: string;
}

@Component({
    selector: 'autocomplete-clear-icon-demo',
    templateUrl: './autocomplete-clear-icon-demo.html',
    imports: [AutoComplete, FormsModule],
    standalone: true,
})
export class AutocompleteClearIconDemo {
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
