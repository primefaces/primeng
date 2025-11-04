import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Code } from '@/domain/code';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';

@Component({
    selector: 'basic-chips-doc',
    standalone: true,
    imports: [FormsModule, AutoCompleteModule, AppDocSectionText, AppCode],
    template: ` <app-docsectiontext>
            <p>
                When <i>typeahead</i> is disabled and <i>multiple</i> is enabled, AutoComplete can work like a chips component. Various features allow flexible item addition: use <i>addOnBlur</i> to add items when the input loses focus,
                <i>addOnTab</i> to add items with the Tab key, and <i>separator</i> to define characters for adding multiple items at once.
            </p>
        </app-docsectiontext>
        <div class="card">
            <label for="chips-blur" class="font-bold mb-2 block">With Add On Blur</label>
            <p-autocomplete [(ngModel)]="valueBlur" inputId="chips-blur" multiple fluid [typeahead]="false" [addOnBlur]="true" placeholder="Type and click outside to add..." />

            <label for="chips-tab" class="font-bold mt-8 mb-2 block">With Add On Tab</label>
            <p-autocomplete [(ngModel)]="valueTab" inputId="chips-tab" multiple fluid [typeahead]="false" [addOnTab]="true" placeholder="Type and press Tab to add..." />

            <label for="chips-separator" class="font-bold mt-8 mb-2 block">With Separator (Comma)</label>
            <p-autocomplete [(ngModel)]="valueSeparator" inputId="chips-separator" multiple fluid [typeahead]="false" separator="," placeholder="Type items separated by comma..." />

            <label for="chips-combined" class="font-bold mt-8 mb-2 block">Combined Features</label>
            <p-autocomplete [(ngModel)]="valueCombined" inputId="chips-combined" multiple fluid [typeahead]="false" [addOnBlur]="true" [addOnTab]="true" separator="," placeholder="Use Tab, Blur, or Comma to add items..." />
        </div>
        <app-code [code]="code" selector="autocomplete-basic-chips-demo"></app-code>`
})
export class BasicChipsDoc {
    valueBlur: any[] = [];
    valueTab: any[] = [];
    valueSeparator: any[] = [];
    valueCombined: any[] = [];

    code: Code = {
        basic: `<!-- With Add On Blur -->
<p-autocomplete
    [(ngModel)]="valueBlur"
    multiple
    [typeahead]="false"
    [addOnBlur]="true"
    placeholder="Type and click outside to add..."
/>

<!-- With Add On Tab -->
<p-autocomplete
    [(ngModel)]="valueTab"
    multiple
    [typeahead]="false"
    [addOnTab]="true"
    placeholder="Type and press Tab to add..."
/>

<!-- With Separator -->
<p-autocomplete
    [(ngModel)]="valueSeparator"
    multiple
    [typeahead]="false"
    separator=","
    placeholder="Type items separated by comma..."
/>

<!-- Combined Features -->
<p-autocomplete
    [(ngModel)]="valueCombined"
    multiple
    [typeahead]="false"
    [addOnBlur]="true"
    [addOnTab]="true"
    separator=","
    placeholder="Use Tab, Blur, or Comma to add items..."
/>`,

        html: `<div class="card">
    <label for="chips-blur" class="font-bold mb-2 block">With Add On Blur</label>
    <p-autocomplete
        [(ngModel)]="valueBlur"
        inputId="chips-blur"
        multiple
        fluid
        [typeahead]="false"
        [addOnBlur]="true"
        placeholder="Type and click outside to add..."
    />

    <label for="chips-tab" class="font-bold mt-8 mb-2 block">With Add On Tab</label>
    <p-autocomplete
        [(ngModel)]="valueTab"
        inputId="chips-tab"
        multiple
        fluid
        [typeahead]="false"
        [addOnTab]="true"
        placeholder="Type and press Tab to add..."
    />

    <label for="chips-separator" class="font-bold mt-8 mb-2 block">With Separator (Comma)</label>
    <p-autocomplete
        [(ngModel)]="valueSeparator"
        inputId="chips-separator"
        multiple
        fluid
        [typeahead]="false"
        separator=","
        placeholder="Type items separated by comma..."
    />

    <label for="chips-combined" class="font-bold mt-8 mb-2 block">Combined Features</label>
    <p-autocomplete
        [(ngModel)]="valueCombined"
        inputId="chips-combined"
        multiple
        fluid
        [typeahead]="false"
        [addOnBlur]="true"
        [addOnTab]="true"
        separator=","
        placeholder="Use Tab, Blur, or Comma to add items..."
    />
</div>`,

        typescript: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';

@Component({
    selector: 'autocomplete-basic-chips-demo',
    templateUrl: './autocomplete-basic-chips-demo.html',
    standalone: true,
    imports: [FormsModule, AutoCompleteModule]
})
export class AutocompleteBasicChipsDemo {
    valueBlur: any[] = [];
    valueTab: any[] = [];
    valueSeparator: any[] = [];
    valueCombined: any[] = [];
}`
    };
}
