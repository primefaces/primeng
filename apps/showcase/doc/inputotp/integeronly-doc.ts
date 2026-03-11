import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputOtpModule } from 'primeng/inputotp';
import { AppCodeModule } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'integeronly-doc',
    standalone: true,
    imports: [FormsModule, InputOtpModule, AppCodeModule, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>When <i>integerOnly</i> is present, only integers can be accepted as input.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-inputotp [(ngModel)]="value" [integerOnly]="true" />
        </div>
        <app-code></app-code>
    `
})
export class IntegerOnlyDoc {
    value: any;
}
