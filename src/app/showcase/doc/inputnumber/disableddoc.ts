import { Component } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'disabled-doc',
    template: `
        <app-docsectiontext>
            <p>When <i>disabled</i> is present, the element cannot be edited and focused.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-inputNumber inputId="integeronly" [disabled]="true" prefix="%" [(ngModel)]="value1"> </p-inputNumber>
        </div>
        <app-code [code]="code" selector="input-number-disabled-demo"></app-code>
  `
})
export class DisabledDoc {

    value1: number = 50;

    code: Code = {
        basic: `
<p-inputNumber inputId="integeronly" [disabled]="true" prefix="%" [(ngModel)]="value1"> </p-inputNumber>`,

        html: `
<div class="card flex justify-content-center">
    <p-inputNumber inputId="integeronly" [disabled]="true" prefix="%" [(ngModel)]="value1"> </p-inputNumber>
</div>`,

        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'input-number-disabled-demo',
    templateUrl: './input-number-disabled-demo.html'
})
export class InputNumberDisabledDemo {
    value1: number = 50;
}`
    };
}
