import { Component } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'disabled-doc',
    template: `
        <app-docsectiontext>
            <p>When <i>disabled</i> is present, the element cannot be edited and focused.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <input id="disabled-input" type="text" pInputText [disabled]="true" [(ngModel)]="value" />
        </div>
        <app-code [code]="code" selector="input-text-disabled-demo"></app-code>
    `
})
export class DisabledDoc {
    value: string | undefined;

    code: Code = {
        basic: `<input id="disabled-input" type="text" pInputText [disabled]="true" [(ngModel)]="value" />`,

        html: `
<div class="card flex justify-content-center">
    <input id="disabled-input" type="text" pInputText [disabled]="true" [(ngModel)]="value" />
</div>`,

        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'input-text-disabled-demo',
    templateUrl: './input-text-disabled-demo.html'
})
export class InputTextDisabledDemo {
    value: string | undefined;
}`
    };
}
