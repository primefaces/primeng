import { Component } from '@angular/core';
import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { AppDemoWrapper } from '@/components/doc/app.demowrapper';
import { TextareaModule } from 'primeng/textarea';

@Component({
    selector: 'disabled-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, AppDemoWrapper, TextareaModule],
    template: `
        <app-docsectiontext>
            <p>When <i>disabled</i> is present, the element cannot be edited and focused.</p>
        </app-docsectiontext>
        <app-demo-wrapper>
            <div class="flex justify-center">
                <textarea rows="5" cols="30" pTextarea [disabled]="true"></textarea>
            </div>
            <app-code></app-code>
        </app-demo-wrapper>
    `
})
export class DisabledDoc {}
