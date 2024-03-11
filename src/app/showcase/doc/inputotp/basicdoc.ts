import { Component } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'basic-doc',
    template: `
        <app-docsectiontext>
            <p>Two-way value binding is defined using <i>ngModel</i>. The number of characters is defined with the <i>length</i> property, which is set to 4 by default.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-inputOtp [(ngModel)]="value"></p-inputOtp>
        </div>
        <app-code [code]="code" selector="input-otp-basic-demo"></app-code>
    `
})
export class BasicDoc {
    value: any;

    code: Code = {
        basic: `<p-inputOtp [(ngModel)]="value"></p-inputOtp>`,

        html: `<div class="card flex justify-content-center">
    <p-inputOtp [(ngModel)]="value"></p-inputOtp>
</div>`,

        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'input-otp-basic-demo',
    templateUrl: './input-otp-basic-demo.html'
})
export class InputOtpBasicDemo {
    value : any
}`
    };
}
