import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Code } from '../../domain/code';

@Component({
    selector: 'max-values-doc',
    template: ` <section class="py-4">
        <app-docsectiontext [title]="title" [id]="id">
            <p>Chips can have a maximum number of entered items. In order to set the limit <i>max</i> property is used and accepts a numeric value which reflects the maximum number of items in the chip list</p>
        </app-docsectiontext>
        <div class="card p-fluid">
            <p-chips [formControl]="values" [max]="2" placeholder="Maximum 2 items"></p-chips>
        </div>
        <app-code [code]="code" selector="chips-max-values-demo"></app-code>
    </section>`
})
export class MaxValuesDoc {
    @Input() id: string;

    @Input() title: string;

    values = new FormControl<string[] | null>(null);

    code: Code = {
        basic: `<p-chips [formControl]="values" [max]="max" placeholder="Maximum 2 items" ></p-chips>`,

        html: `
<div class="card p-fluid">
    <p-chips [formControl]="values" [max]="max" placeholder="Maximum 2 items"></p-chips>  
</div>`,

        typescript: `
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'chips-max-values-demo',
    templateUrl: './chips-max-values-demo.html',
    styleUrls: ['./chips-max-values-demo.scss']
})
export class ChipsMaxValuesDemo {
    values = new FormControl<string[] | null>(null);
    max = 2;
}`
    };
}
