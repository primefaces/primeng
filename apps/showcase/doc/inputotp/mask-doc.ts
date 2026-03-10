import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputOtpModule } from 'primeng/inputotp';
import { AppCode } from '@/components/doc/app.code';
import { AppDemoWrapper } from '@/components/doc/app.demowrapper';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'mask-doc',
    standalone: true,
    imports: [FormsModule, InputOtpModule, AppCode, AppDemoWrapper, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>Enable the <i>mask</i> option to hide the values in the input fields.</p>
        </app-docsectiontext>
        <app-demo-wrapper>
            <div class="flex justify-center">
                <p-inputotp [(ngModel)]="value" [mask]="true" />
            </div>
            <app-code></app-code>
        </app-demo-wrapper>
    `
})
export class MaskDoc {
    value: any;
}
