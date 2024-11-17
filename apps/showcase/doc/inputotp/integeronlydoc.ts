import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'integer-only-doc',
    template: `
        <app-docsectiontext>
            <p>When <i>integerOnly</i> is present, only integers can be accepted as input.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-inputotp [(ngModel)]="value" [integerOnly]="true" />
        </div>
        <app-code [code]="code" selector="input-otp-integer-only-demo"></app-code>
    `
})
export class IntegerOnlyDoc {
    value: any;

    code: Code = {
        basic: `<p-inputotp [(ngModel)]="value" [integerOnly]="true" />`,

        html: `<div class="card flex justify-center">
    <p-inputotp [(ngModel)]="value" [integerOnly]="true" />
</div>`,

        typescript: `import { Component } from '@angular/core';
import { InputOtp } from 'primeng/inputotp';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'input-otp-integer-only-demo',
    templateUrl: './input-otp-integer-only-demo.html',
    standalone: true,
    imports: [FormsModule, InputOtp]
})
export class InputOtpIntegerOnlyDemo {
    value : any
}`
    };
}
