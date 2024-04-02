import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'integer-only-doc',
    template: `
        <app-docsectiontext>
            <p>When <i>integerOnly</i> is present, only integers can be accepted as input.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-inputOtp [(ngModel)]="value" [integerOnly]="true"></p-inputOtp>
        </div>
        <app-code [code]="code" selector="input-otp-integer-only-demo"></app-code>
    `
})
export class IntegerOnlyDoc {
    value: any;

    code: Code = {
        basic: `<p-inputOtp [(ngModel)]="value" [integerOnly]="true"></p-inputOtp>`,

        html: `<div class="card flex justify-content-center">
    <p-inputOtp [(ngModel)]="value" [integerOnly]="true"></p-inputOtp>
</div>`,

        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'input-otp-integer-only-demo',
    templateUrl: './input-otp-integer-only-demo.html'
})
export class InputOtpIntegerOnlyDemo {
    value : any
}`
    };
}
