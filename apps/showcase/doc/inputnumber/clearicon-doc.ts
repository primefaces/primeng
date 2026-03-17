import { AppCode } from '@/components/doc/app.code';
import { AppDemoWrapper } from '@/components/doc/app.demowrapper';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { InputNumberModule } from 'primeng/inputnumber';

@Component({
    selector: 'clear-icon-doc',
    standalone: true,
    imports: [FormsModule, RouterModule, InputNumberModule, AppCode, AppDemoWrapper, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>When <i>showClear</i> is enabled, a clear icon is displayed to clear the value.</p>
        </app-docsectiontext>
        <app-demo-wrapper>
            <div class="flex justify-center">
                <p-inputnumber [(ngModel)]="value" inputId="price_input" mode="currency" currency="USD" locale="en-US" [showClear]="true" inputStyleClass="w-56" />
            </div>
            <app-code></app-code>
        </app-demo-wrapper>
    `
})
export class ClearIconDoc {
    value: number | undefined;
}
