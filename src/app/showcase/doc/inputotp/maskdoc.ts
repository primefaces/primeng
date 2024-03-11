import { Component } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'mask-doc',
    template: `
        <app-docsectiontext>
            <p>Enable the <i>mask</i> option to hide the values in the input fields.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-inputOtp [(ngModel)]="value" [mask]="true"></p-inputOtp>
        </div>
        <app-code [code]="code" selector="input-otp-mask-demo"></app-code>
    `
})
export class MaskDoc {
    value: any;

    code: Code = {
        basic: `<p-inputOtp [(ngModel)]="value" [mask]="true"></p-inputOtp>`,

        html: `<div class="card flex justify-content-center">
    <p-inputOtp [(ngModel)]="value" [mask]="true"></p-inputOtp>
</div>`,

        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'input-otp-mask-demo',
    templateUrl: './input-otp-mask-demo.html'
})
export class InputOtpMaskDemo {
    value: any;
}`
    };
}
