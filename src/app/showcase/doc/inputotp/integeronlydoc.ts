import { Component } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'integer-only-doc',
    template: `
        <app-docsectiontext>
            <p>Two-way value binding is defined using <i>ngModel</i>.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
         <p-inputOtp [(ngModel)]="value" [integerOnly]="true"></p-inputOtp>
        </div>
        <app-code [code]="code" selector="input-otp-integer-only-demo"></app-code>
    `
})
export class IntegerOnlyDoc {
    value : any

    code: Code = {
        basic: `<p-inputSwitch [(ngModel)]="checked"></p-inputSwitch>`,

        html: ` 
<div class="card flex justify-content-center">
    <p-inputSwitch [(ngModel)]="checked"></p-inputSwitch>
</div>`,

        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'input-switch-basic-demo',
    templateUrl: './input-switch-basic-demo.html'
})
export class InputSwitchBasicDemo {
    checked: boolean = false;
}`
    };
}
