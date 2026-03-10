import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputOtpModule } from 'primeng/inputotp';
import { AppCode } from '@/components/doc/app.code';
import { AppDemoWrapper } from '@/components/doc/app.demowrapper';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'sizes-doc',
    standalone: true,
    imports: [FormsModule, InputOtpModule, AppCode, AppDemoWrapper, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>InputOtp provides <i>small</i> and <i>large</i> sizes as alternatives to the base.</p>
        </app-docsectiontext>
        <app-demo-wrapper>
            <div class="flex flex-col items-center gap-4">
                <p-inputotp [(ngModel)]="value1" size="small" />
                <p-inputotp [(ngModel)]="value2" />
                <p-inputotp [(ngModel)]="value3" size="large" />
            </div>
            <app-code></app-code>
        </app-demo-wrapper>
    `
})
export class SizesDoc {
    value1: any;

    value2: any;

    value3: any;
}
