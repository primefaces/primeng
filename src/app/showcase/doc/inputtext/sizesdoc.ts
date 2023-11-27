import { Component } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'sizes-doc',
    template: `
        <app-docsectiontext>
            <p>Apply <i>.p-inputtext-sm</i> to reduce the size of the input element or <i>.p-inputtext-lg</i> to enlarge it.</p>
        </app-docsectiontext>
        <div class="card flex flex-column align-items-center gap-3 ">
            <input pInputText type="text" class="p-inputtext-sm" placeholder="Small" [(ngModel)]="value" />
            <input pInputText type="text" placeholder="Normal" [(ngModel)]="value2" />
            <input pInputText type="text" class="p-inputtext-lg" placeholder="Large" [(ngModel)]="value3" />
        </div>
        <app-code [code]="code" selector="input-text-sizes-demo"></app-code>
    `
})
export class SizesDoc {
    value: string | undefined;

    value2: string | undefined;

    value3: string | undefined;

    code: Code = {
        basic: `<input pInputText type="text" class="p-inputtext-sm" placeholder="Small" [(ngModel)]="value" />
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
    selector: 'input-text-sizes-demo',
    templateUrl: './input-text-sizes-demo.html'
})
export class InputTextSizesDemo {
    value: string | undefined;
    value2: string | undefined;
    value3: string | undefined;
}`
    };
}
