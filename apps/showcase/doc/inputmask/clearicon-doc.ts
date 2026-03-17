import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputMaskModule } from 'primeng/inputmask';
import { AppCodeModule } from '@/components/doc/app.code';
import { AppDemoWrapper } from '@/components/doc/app.demowrapper';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'clear-icon-doc',
    standalone: true,
    imports: [FormsModule, InputMaskModule, AppCodeModule, AppDemoWrapper, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>When <i>showClear</i> is enabled, a clear icon is displayed to clear the value.</p>
        </app-docsectiontext>
        <app-demo-wrapper>
            <div class="flex justify-center">
                <p-inputmask mask="99-999999" [(ngModel)]="value" placeholder="99-999999" [showClear]="true" />
            </div>
            <app-code></app-code>
        </app-demo-wrapper>
    `
})
export class ClearIconDoc {
    value: string | undefined;
}
