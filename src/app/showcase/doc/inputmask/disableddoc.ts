import { Component } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'disabled-doc',
    template: `
        <app-docsectiontext>
            <p>When <i>disabled</i> is present, the element cannot be edited and focused.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-inputMask mask="999-99-9999" [(ngModel)]="value" [disabled]="true"></p-inputMask>
        </div>
        <app-code [code]="code" selector="input-mask-disabled-demo"></app-code>
    `
})
export class DisabledDoc {
    value: string | undefined;

    code: Code = {
        basic: `
<p-inputMask mask="999-99-9999" [(ngModel)]="value" [disabled]="true"></p-inputMask>`,

        html: `
<div class="card flex justify-content-center">
    <p-inputMask mask="999-99-9999" [(ngModel)]="value" [disabled]="true"></p-inputMask>
</div>`,

        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'input-mask-disabled-demo',
    templateUrl: './input-mask-disabled-demo.html'
})
export class InputMaskDisabledDemo {
    value: string | undefined;
}`
    };
}
