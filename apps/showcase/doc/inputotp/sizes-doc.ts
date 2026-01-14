import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputOtpModule } from 'primeng/inputotp';
import { AppCodeModule } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'sizes-doc',
    standalone: true,
    imports: [FormsModule, InputOtpModule, AppCodeModule, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>InputOtp provides <i>small</i> and <i>large</i> sizes as alternatives to the base.</p>
        </app-docsectiontext>
        <div class="card flex flex-col items-center gap-4">
            <p-inputotp [(ngModel)]="value1" size="small" />
            <p-inputotp [(ngModel)]="value2" />
            <p-inputotp [(ngModel)]="value3" size="large" />
        </div>
        <app-code></app-code>
    `
})
export class SizesDoc {
    value1: any;

    value2: any;

    value3: any;
}
