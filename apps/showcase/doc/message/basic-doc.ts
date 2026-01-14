import { Component } from '@angular/core';
import { MessageModule } from 'primeng/message';
import { AppCodeModule } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'basic-doc',
    standalone: true,
    imports: [MessageModule, AppCodeModule, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>Message component requires a content to display.</p>
        </app-docsectiontext>
        <div class="card">
            <p-message>Message Content</p-message>
        </div>
        <app-code></app-code>
    `
})
export class BasicDoc {}
