import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Code } from '@/domain/code';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';

interface AutoCompleteCompleteEvent {
    originalEvent: Event;
    query: string;
}

@Component({
    selector: 'custom-options-doc',
    standalone: true,
    imports: [CommonModule, FormsModule, AutoCompleteModule, AppDocSectionText, AppCode],
    template: ` <app-docsectiontext>
            <p>
                AutoComplete supports custom option label and value functions using <i>optionLabel</i> and <i>optionValue</i> properties. This allows flexible handling of complex object structures where the display label and the selected value can be
                customized independently.
            </p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-autocomplete
                [(ngModel)]="selectedItems"
                [suggestions]="suggestions"
                (completeMethod)="search($event)"
                [multiple]="true"
                [dropdown]="true"
                [optionLabel]="optionLabelFn"
                [optionValue]="optionValueFn"
                [typeahead]="false"
                placeholder="Select Items"
            />
        </div>
        <app-code [code]="code" selector="autocomplete-custom-options-demo"></app-code>`
})
export class CustomOptionsDoc {
    items: any[] = [
        { label: 'Item 1', value2: { id: 1 } },
        { label: 'Item 2', value2: { id: 2 } },
        { label: 'Item 3', value2: { id: 3 } },
        { label: 'Another Item', value2: { id: 4 } },
        { label: 'Last Item', value2: { id: 5 } }
    ];

    selectedItems: any[] = [];

    suggestions: any[] = [];

    value: any;

    optionLabelFn(option: any) {
        return typeof option === 'string' ? option : option.label;
    }

    optionValueFn(option: any) {
        return typeof option === 'string'
            ? {
                  test: option
              }
            : option.value2;
    }

    search(event: AutoCompleteCompleteEvent) {
        this.suggestions = this.items.filter((item) => item.label.toLowerCase().includes(event.query.toLowerCase()));
    }

    code: Code = {
        basic: `<p-autocomplete
    [(ngModel)]="selectedItems"
    [suggestions]="suggestions"
    (completeMethod)="search($event)"
    [multiple]="true"
    [optionLabel]="optionLabelFn"
    [optionValue]="optionValueFn" 
/>`,

        html: `<div class="card flex justify-center">
    <p-autocomplete
        [(ngModel)]="selectedItems"
        [suggestions]="suggestions"
        (completeMethod)="search($event)"
        [multiple]="true"
        [dropdown]="true"
        [optionLabel]="optionLabelFn"
        [optionValue]="optionValueFn"
        [typeahead]="false"
        placeholder="Select Items"
    />
</div>`,

        typescript: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';

interface AutoCompleteCompleteEvent {
    originalEvent: Event;
    query: string;
}

@Component({
    selector: 'autocomplete-custom-options-demo',
    templateUrl: './autocomplete-custom-options-demo.html',
    imports: [AutoCompleteModule, FormsModule],
    standalone: true,
})
export class AutocompleteCustomOptionsDemo {
    items: any[] = [
        { label: 'Item 1', value2: { id: 1 } },
        { label: 'Item 2', value2: { id: 2 } },
        { label: 'Item 3', value2: { id: 3 } },
        { label: 'Another Item', value2: { id: 4 } },
        { label: 'Last Item', value2: { id: 5 } }
    ];

    selectedItems: any[] = [];
    suggestions: any[] = [];

    optionLabelFn(option: any) {
        return typeof option === 'string' ? option : option.label;
    }

    optionValueFn(option: any) {
        return typeof option === 'string'
            ? {
                  test: option
              }
            : option.value2;
    }

    search(event: AutoCompleteCompleteEvent) {
        this.suggestions = this.items.filter((item) => item.label.toLowerCase().includes(event.query.toLowerCase()));
    }
}`
    };
}
