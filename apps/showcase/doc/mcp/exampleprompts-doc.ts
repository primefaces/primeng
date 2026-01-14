import { AppCodeModule } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';

@Component({
    selector: 'exampleprompts-doc',
    standalone: true,
    imports: [AppCodeModule, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>Once installed, try asking your AI assistant:</p>
        </app-docsectiontext>
        <app-code [hideToggleCode]="true"></app-code>
    `
})
export class ExamplePromptsDoc {}
