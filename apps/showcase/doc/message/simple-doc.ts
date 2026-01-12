import { Component } from '@angular/core';
import { MessageModule } from 'primeng/message';
import { AppCodeModule } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'simple-doc',
    standalone: true,
    imports: [MessageModule, AppCodeModule, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>Configure the <i>variant</i> value as <i>simple</i> for messages without borders and backgrounds.</p>
        </app-docsectiontext>
        <div class="card flex flex-wrap gap-4 justify-center">
            <p-message severity="success" variant="simple">Success Message</p-message>
            <p-message severity="info" variant="simple">Info Message</p-message>
            <p-message severity="warn" variant="simple">Warn Message</p-message>
            <p-message severity="error" variant="simple">Error Message</p-message>
            <p-message severity="secondary" variant="simple">Secondary Message</p-message>
            <p-message severity="contrast" variant="simple">Contrast Message</p-message>
        </div>
        <app-code></app-code>
    `
})
export class SimpleDoc {}
