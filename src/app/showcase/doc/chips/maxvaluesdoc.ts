import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Code } from '@domain/code';

@Component({
    selector: 'max-values-doc',
    template: `
        <app-docsectiontext>
            <p>Chips can have a maximum number of entered items. To set this limit, the <i>max</i> property is used, which accepts a numeric value that represents the maximum number of items in the chip list</p>
        </app-docsectiontext>
        <div class="card p-fluid">
            <p-chips [formControl]="values" [max]="2" placeholder="Maximum 2 items" />
        </div>
        <app-code [code]="code" selector="chips-max-values-demo"></app-code>
    `
})
export class MaxValuesDoc {
    values = new FormControl<string[] | null>(null);

    code: Code = {
        basic: `<p-chips 
    [formControl]="values" 
    [max]="max" 
    placeholder="Maximum 2 items" />`,

        html: `<div class="card p-fluid">
    <p-chips 
        [formControl]="values"
        [max]="max" 
        placeholder="Maximum 2 items" /> 
</div>`,

        typescript: `import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ChipsModule } from 'primeng/chips';

@Component({
    selector: 'chips-max-values-demo',
    templateUrl: './chips-max-values-demo.html',
    standalone: true,
    imports: [ReactiveFormsModule, ChipsModule]
})
export class ChipsMaxValuesDemo {
    values = new FormControl<string[] | null>(null);
    max = 2;
}`
    };
}
