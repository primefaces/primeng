import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputOtpModule } from 'primeng/inputotp';
import { AppCode } from '@/components/doc/app.code';
import { AppDemoWrapper } from '@/components/doc/app.demowrapper';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'integer-only-doc',
    standalone: true,
    imports: [FormsModule, InputOtpModule, AppCode, AppDemoWrapper, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>When <i>integerOnly</i> is present, only integers can be accepted as input.</p>
        </app-docsectiontext>
        <app-demo-wrapper>
            <div class="flex justify-center">
                <p-inputotp [(ngModel)]="value" [integerOnly]="true" />
            </div>
            <app-code></app-code>
        </app-demo-wrapper>
    `
})
export class IntegerOnlyDoc {
    value: any;
}
