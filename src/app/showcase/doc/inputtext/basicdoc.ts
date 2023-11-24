import { Component } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'basic-doc',
    template: `
        <app-docsectiontext>
            <p>InputText is used as a controlled input with <i>ngModel</i> properties.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <input type="text" pInputText [(ngModel)]="value" />
        </div>
        <app-code [code]="code" selector="input-text-basic-demo"></app-code>
    `
})
export class BasicDoc {

    value: string;

    code: Code = {
        basic: `
<input type="text" pInputText [(ngModel)]="value" />`,

        html: `
<div class="card flex justify-content-center">
    <input type="text" pInputText [(ngModel)]="value" />
</div>`,

        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'input-text-basic-demo',
    templateUrl: './input-text-basic-demo.html'
})
export class InputTextBasicDemo {
    value: string;
}`
    };
}
