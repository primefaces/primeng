import { Component } from '@angular/core';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'llms-full-txt-doc',
    standalone: true,
    imports: [AppDocSectionText, ButtonModule],
    template: `
        <app-docsectiontext>
            <p>
                The <code>llms-full.txt</code> file is a complete list of all the pages in the PrimeNG documentation. It is used to help AI models understand the entire documentation set.
            </p>
            <a href="/llms/components.md" target="_blank">
                <p-button label="Open llms-full.txt" />
            </a>
        </app-docsectiontext>
    `
})
export class LlmsFullTxtDoc {}
