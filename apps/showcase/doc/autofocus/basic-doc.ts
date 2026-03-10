import { Component } from '@angular/core';
import { AutoFocusModule } from 'primeng/autofocus';
import { InputTextModule } from 'primeng/inputtext';
import { AppCode } from '@/components/doc/app.code';
import { AppDemoWrapper } from '@/components/doc/app.demowrapper';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'basic-doc',
    standalone: true,
    imports: [AutoFocusModule, InputTextModule, AppCode, AppDemoWrapper, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>AutoFocus is applied to any focusable input element with the <i>pAutoFocus</i> directive.</p>
        </app-docsectiontext>
        <app-demo-wrapper>
            <div class="flex justify-center">
                <input type="text" pInputText [pAutoFocus]="true" placeholder="Automatically focused" />
            </div>
            <app-code></app-code>
        </app-demo-wrapper>
    `
})
export class BasicDoc {}
