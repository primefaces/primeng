import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'mask-doc',
    template: `
        <app-docsectiontext>
            <p>Enable the <i>mask</i> option to hide the values in the input fields.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-inputOtp [(ngModel)]="value" [mask]="true" />
        </div>
        <app-code [code]="code" selector="input-otp-mask-demo"></app-code>
    `
})
export class MaskDoc {
    value: any;

    code: Code = {
        basic: `<p-inputOtp [(ngModel)]="value" [mask]="true" />`,

        html: `<div class="card flex justify-center">
    <p-inputOtp [(ngModel)]="value" [mask]="true" />
</div>`,

        typescript: `import { Component } from '@angular/core';
import { InputOtpModule } from 'primeng/inputotp';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'input-otp-mask-demo',
    templateUrl: './input-otp-mask-demo.html',
    standalone: true,
    imports: [FormsModule, InputOtpModule]
})
export class InputOtpMaskDemo {
    value: any;
}`
    };
}
