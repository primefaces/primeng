import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'basic-doc',
    template: `
        <app-docsectiontext>
            <p>Two-way value binding is defined using <i>ngModel</i>. The number of characters is defined with the <i>length</i> property, which is set to 4 by default.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-inputOtp [(ngModel)]="value" />
        </div>
        <app-code [code]="code" selector="input-otp-basic-demo"></app-code>
    `
})
export class BasicDoc {
    value: any;

    code: Code = {
        basic: `<p-inputOtp [(ngModel)]="value" />`,

        html: `<div class="card flex justify-content-center">
    <p-inputOtp [(ngModel)]="value" />
</div>`,

        typescript: `import { Component } from '@angular/core';
import { InputOtpModule } from 'primeng/inputotp';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'input-otp-basic-demo',
    templateUrl: './input-otp-basic-demo.html',
    standalone: true,
    imports: [FormsModule, InputOtpModule]
})
export class InputOtpBasicDemo {
    value : any
}`
    };
}
