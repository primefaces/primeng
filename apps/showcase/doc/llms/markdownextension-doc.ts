import { Component } from '@angular/core';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'markdownextension-doc',
    standalone: true,
    imports: [AppDocSectionText, ButtonModule],
    template: `
        <app-docsectiontext>
            <p>Add a <code>.md</code> to a page's URL to display a Markdown version of that page.</p>
            <a href="/llms/components/button.md" target="_blank">
                <p-button label="Open /button.md" />
            </a>
        </app-docsectiontext>
    `
})
export class MarkdownExtensionDoc {}
