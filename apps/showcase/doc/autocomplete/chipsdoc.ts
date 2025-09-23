import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Code } from '@/domain/code';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';

@Component({
    selector: 'autocomplete-chips-demo',
    standalone: true,
    imports: [FormsModule, AutoCompleteModule, AppDocSectionText, AppCode],
    template: ` <app-docsectiontext>
            <p>
                When <i>typeahead</i> is disabled and <i>multiple</i> is enabled, autocomplete can work like a chips component. Use <i>addOnBlur</i> to add item on blur and <i>separator</i> to define the separator character(s) for adding multiple
                items at once.
            </p>
        </app-docsectiontext>
        <div class="card">
            <label for="chips-ac-1" class="font-bold mb-2 block">Chips Mode</label>
            <p-autocomplete [(ngModel)]="value1" inputId="chips-ac-1" multiple fluid [typeahead]="false" placeholder="Add items..." />

            <label for="chips-ac-2" class="font-bold mt-8 mb-2 block">With Add on Blur</label>
            <p-autocomplete [(ngModel)]="value2" inputId="chips-ac-2" multiple fluid [typeahead]="false" [addOnBlur]="true" placeholder="Type and click outside..." />

            <label for="chips-ac-3" class="font-bold mt-8 mb-2 block">With Separator (Comma)</label>
            <p-autocomplete [(ngModel)]="value3" inputId="chips-ac-3" multiple fluid [typeahead]="false" separator="," placeholder="Type items separated by comma..." />
        </div>
        <app-code [code]="code" selector="autocomplete-chips-demo"></app-code>`
})
export class ChipsDoc {
    value1: any[] | undefined;

    value2: any[] | undefined;

    value3: any[] | undefined;

    code: Code = {
        basic: `<label for="chips-ac-1" class="font-bold mb-2 block">Chips Mode</label>
<p-autocomplete
    [(ngModel)]="value1"
    inputId="chips-ac-1"
    multiple
    fluid
    [typeahead]="false"
    placeholder="Add items..." 
/>

<label for="chips-ac-2" class="font-bold mt-8 mb-2 block">With Add on Blur</label>
<p-autocomplete
    [(ngModel)]="value2"
    inputId="chips-ac-2"
    multiple
    fluid
    [typeahead]="false"
    [addOnBlur]="true"
    placeholder="Type and click outside..." 
/>

<label for="chips-ac-3" class="font-bold mt-8 mb-2 block">With Separator (Comma)</label>
<p-autocomplete
    [(ngModel)]="value3"
    inputId="chips-ac-3"
    multiple
    fluid
    [typeahead]="false"
    separator=","
    placeholder="Type items separated by comma..." 
/>
`,

        html: `<div class="card">
    <label for="chips-ac-1" class="font-bold mb-2 block">Chips Mode</label>
    <p-autocomplete
        [(ngModel)]="value1"
        inputId="chips-ac-1"
        multiple
        fluid
        [typeahead]="false"
        placeholder="Add items..." 
    />

    <label for="chips-ac-2" class="font-bold mt-8 mb-2 block">With Add on Blur</label>
    <p-autocomplete
        [(ngModel)]="value2"
        inputId="chips-ac-2"
        multiple
        fluid
        [typeahead]="false"
        [addOnBlur]="true"
        placeholder="Type and click outside..." 
    />

    <label for="chips-ac-3" class="font-bold mt-8 mb-2 block">With Separator (Comma)</label>
    <p-autocomplete
        [(ngModel)]="value3"
        inputId="chips-ac-3"
        multiple
        fluid
        [typeahead]="false"
        separator=","
        placeholder="Type items separated by comma..." 
    />
</div>`,

        typescript: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AutoComplete } from 'primeng/autocomplete';

@Component({
    selector: 'autocomplete-chips-demo',
    templateUrl: './autocomplete-chips-demo.html',
    standalone: true,
    imports: [FormsModule, AutoComplete]
})
export class AutocompleteChipsDemo {
    value1: any[] | undefined;

    value2: any[] | undefined;

    value3: any[] | undefined;
}`
    };
}
