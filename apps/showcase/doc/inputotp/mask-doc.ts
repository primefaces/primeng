import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputOtpModule } from 'primeng/inputotp';
import { AppCodeModule } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'mask-doc',
    standalone: true,
    imports: [FormsModule, InputOtpModule, AppCodeModule, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>Enable the <i>mask</i> option to hide the values in the input fields.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-inputotp [(ngModel)]="value" [mask]="true" />
        </div>
        <app-code></app-code>
    `
})
export class MaskDoc {
    value: any;
}
