import { Component } from '@angular/core';
import { AppCode } from '@/components/doc/app.code';
import { AppDemoWrapper } from '@/components/doc/app.demowrapper';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'directive-doc',
    standalone: true,
    imports: [AppCode, AppDemoWrapper, AppDocSectionText, ButtonModule],
    template: `
        <app-docsectiontext>
            <p>Button can also be used as directive using <i>pButton</i> along with <i>pButtonLabel</i> and <i>pButtonIcon</i> helper directives.</p>
        </app-docsectiontext>
        <app-demo-wrapper>
            <div class="flex justify-center">
                <button pButton>
                    <i class="pi pi-check" pButtonIcon></i>
                    <span pButtonLabel>Save</span>
                </button>
            </div>
            <app-code></app-code>
        </app-demo-wrapper>
    `
})
export class DirectiveDoc {}
