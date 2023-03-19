import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'inputtext-sizes-demo',
    template: ` <section>
        <app-docsectiontext [title]="title" [id]="id">
            <p>Apply <i>.p-inputtext-sm</i> to reduce the size of the input element or <i>.p-inputtext-lg</i> to enlarge it.</p>
        </app-docsectiontext>
        <div class="card flex flex-column align-items-center gap-3 ">
            <input pInputText type="text" class="p-inputtext-sm" placeholder="Small" [(ngModel)]="value" />
            <input pInputText type="text" placeholder="Normal" [(ngModel)]="value2" />
            <input pInputText type="text" class="p-inputtext-lg" placeholder="Large" [(ngModel)]="value3" />
        </div>
        <app-code [code]="code" selector="inputtext-sizes-demo"></app-code>
    </section>`
})
export class SizesDoc {
    value: string;

    value2: string;

    value3: string;

    @Input() id: string;

    @Input() title: string;

    code: Code = {
        basic: `
<input pInputText type="text" class="p-inputtext-sm" placeholder="Small" [(ngModel)]="value" />
<input pInputText type="text" placeholder="Normal" [(ngModel)]="value2" />
<input pInputText type="text" class="p-inputtext-lg" placeholder="Large" [(ngModel)]="value3" />`,

        html: `
<div class="card flex flex-column align-items-center gap-3 ">
    <input pInputText type="text" class="p-inputtext-sm" placeholder="Small" [(ngModel)]="value" />
    <input pInputText type="text" placeholder="Normal" [(ngModel)]="value2" />
    <input pInputText type="text" class="p-inputtext-lg" placeholder="Large" [(ngModel)]="value3" />
</div>`,

        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'inputtext-sizes-demo',
    templateUrl: './inputtext-sizes-demo.html',
    styleUrls: ['./inputtext-sizes-demo.scss']
})
export class InputtextSizesDemo {
    value: string;
    value2: string;
    value3: string;
}`
    };
}
