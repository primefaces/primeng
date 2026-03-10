import { Component } from '@angular/core';
import { MessageModule } from 'primeng/message';
import { AppCode } from '@/components/doc/app.code';
import { AppDemoWrapper } from '@/components/doc/app.demowrapper';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'simple-doc',
    standalone: true,
    imports: [MessageModule, AppCode, AppDemoWrapper, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>Configure the <i>variant</i> value as <i>simple</i> for messages without borders and backgrounds.</p>
        </app-docsectiontext>
        <app-demo-wrapper>
            <div class="flex flex-wrap gap-4 justify-center">
                <p-message severity="success" variant="simple">Success Message</p-message>
                <p-message severity="info" variant="simple">Info Message</p-message>
                <p-message severity="warn" variant="simple">Warn Message</p-message>
                <p-message severity="error" variant="simple">Error Message</p-message>
                <p-message severity="secondary" variant="simple">Secondary Message</p-message>
                <p-message severity="contrast" variant="simple">Contrast Message</p-message>
            </div>
            <app-code></app-code>
        </app-demo-wrapper>
    `
})
export class SimpleDoc {}
