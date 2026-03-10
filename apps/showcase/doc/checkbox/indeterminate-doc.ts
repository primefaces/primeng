import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { AppCode } from '@/components/doc/app.code';
import { AppDemoWrapper } from '@/components/doc/app.demowrapper';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'indeterminate-doc',
    standalone: true,
    imports: [FormsModule, CheckboxModule, AppCode, AppDemoWrapper, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>The <i>indeterminate</i> state indicates that a checkbox is neither "on" or "off".</p>
        </app-docsectiontext>
        <app-demo-wrapper>
            <div class="flex justify-center gap-4">
                <p-checkbox [(ngModel)]="checked" [binary]="true" [indeterminate]="true" />
            </div>
            <app-code></app-code>
        </app-demo-wrapper>
    `
})
export class IndeterminateDoc {
    checked: any = null;
}
