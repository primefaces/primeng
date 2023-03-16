import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'select-button-multiple-demo',
    template: ` <div>
        <app-docsectiontext [title]="title" [id]="id">
            <p>SelectButton allows selecting only one item by default and enabling <i>multiple</i> allows choosing more. In multiple case, model property should be an array instead of a single value.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-selectButton [options]="paymentOptions" [(ngModel)]="value" [multiple]="true" optionLabel="name" optionValue="value"></p-selectButton>
        </div>
        <app-code [code]="code" selector="select-button-multiple-demo"></app-code>
    </div>`
})
export class MultipleDoc {
    @Input() id: string;

    @Input() title: string;

    paymentOptions: any[] = [
        { name: 'Option 1', value: 1 },
        { name: 'Option 2', value: 2 },
        { name: 'Option 3', value: 3 }
    ];

    value: number;

    code: Code = {
        basic: `
<p-selectButton [options]="paymentOptions" [(ngModel)]="value" [multiple]="true" optionLabel="name" optionValue="value"></p-selectButton>`,

        html: `
<div class="card flex justify-content-center">
    <p-selectButton [options]="paymentOptions" [(ngModel)]="value" [multiple]="true" optionLabel="name" optionValue="value"></p-selectButton>
</div>`,

        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'select-button-multiple-demo',
    templateUrl: './select-button-multiple-demo.html',
    styleUrls: ['./select-button-multiple-demo.scss']
})

export class SelectButtonMultipleDemo {
    value: number;
    
    paymentOptions: any[] = [
        { name: 'Option 1', value: 1 },
        { name: 'Option 2', value: 2 },
        { name: 'Option 3', value: 3 }
    ];

}`
    };
}
