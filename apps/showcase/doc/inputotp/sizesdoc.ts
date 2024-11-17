import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'sizes-doc',
    template: `
        <app-docsectiontext>
            <p>InputOtp provides <i>small</i> and <i>large</i> sizes as alternatives to the base.</p>
        </app-docsectiontext>
        <div class="card flex flex-col items-center gap-4">
            <p-inputotp [(ngModel)]="value1" size="small" />
            <p-inputotp [(ngModel)]="value2" />
            <p-inputotp [(ngModel)]="value3" size="large" />
        </div>
        <app-code [code]="code" selector="input-otp-sizes-demo"></app-code>
    `
})
export class SizesDoc {
    value1: any;

    value2: any;

    value3: any;

    code: Code = {
        basic: `<p-inputotp [(ngModel)]="value1" size="small" />
<p-inputotp [(ngModel)]="value2" />
<p-inputotp [(ngModel)]="value3" size="large" />`,

        html: `<div class="card flex justify-center">
    <p-inputotp [(ngModel)]="value1" size="small" />
    <p-inputotp [(ngModel)]="value2" />
    <p-inputotp [(ngModel)]="value3" size="large" />
</div>`,

        typescript: `import { Component } from '@angular/core';
import { InputOtp } from 'primeng/inputotp';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'input-otp-sizes-demo',
    templateUrl: './input-otp-sizes-demo.html',
    standalone: true,
    imports: [FormsModule, InputOtp]
})
export class InputOtpSizesDemo {
    value : any
}`
    };
}
