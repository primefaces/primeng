import { Component } from '@angular/core';
import { MessageModule } from 'primeng/message';
import { AppCode } from '@/components/doc/app.code';
import { AppDemoWrapper } from '@/components/doc/app.demowrapper';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'closable-doc',
    standalone: true,
    imports: [MessageModule, AppCode, AppDemoWrapper, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>Enable <i>closable</i> option to display an icon to remove a message.</p>
        </app-docsectiontext>
        <app-demo-wrapper>
            <p-message closable>Closable Message</p-message>
            <app-code></app-code>
        </app-demo-wrapper>
    `
})
export class ClosableDoc {}
