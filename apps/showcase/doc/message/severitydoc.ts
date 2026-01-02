import { Component } from '@angular/core';
import { MessageModule } from 'primeng/message';
import { AppCodeModule } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'severity-doc',
    standalone: true,
    imports: [MessageModule, AppCodeModule, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>The <i>severity</i> option specifies the type of the message.</p>
        </app-docsectiontext>
        <div class="card flex flex-wrap gap-4 justify-center">
            <p-message severity="success">Success Message</p-message>
            <p-message severity="info">Info Message</p-message>
            <p-message severity="warn">Warn Message</p-message>
            <p-message severity="error">Error Message</p-message>
            <p-message severity="secondary">Secondary Message</p-message>
            <p-message severity="contrast">Contrast Message</p-message>
        </div>
        <app-code selector="message-severity-demo"></app-code>
    `
})
export class SeverityDoc {}
