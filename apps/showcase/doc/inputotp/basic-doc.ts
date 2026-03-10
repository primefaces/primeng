import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputOtpModule } from 'primeng/inputotp';
import { AppCode } from '@/components/doc/app.code';
import { AppDemoWrapper } from '@/components/doc/app.demowrapper';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'basic-doc',
    standalone: true,
    imports: [FormsModule, InputOtpModule, AppCode, AppDemoWrapper, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>Two-way value binding is defined using <i>ngModel</i>. The number of characters is defined with the <i>length</i> property, which is set to 4 by default.</p>
        </app-docsectiontext>
        <app-demo-wrapper>
            <div class="flex justify-center">
                <p-inputotp [(ngModel)]="value" />
            </div>
            <app-code></app-code>
        </app-demo-wrapper>
    `
})
export class BasicDoc {
    value: any;
}
