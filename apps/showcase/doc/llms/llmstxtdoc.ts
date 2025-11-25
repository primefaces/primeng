import { Component } from '@angular/core';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'llms-txt-doc',
    standalone: true,
    imports: [AppDocSectionText, ButtonModule],
    template: `
        <app-docsectiontext>
            <p>
                The <a href="https://llmstxt.org/" target="_blank" rel="noopener noreferrer">llms.txt</a> file is an industry standard that helps AI models better understand and navigate the PrimeNG documentation. It lists key pages in a structured format, making it easier for LLMs to retrieve relevant information.
            </p>
            <a href="/llms/llms.txt" target="_blank">
                <p-button label="Open llms.txt" />
            </a>
        </app-docsectiontext>
    `
})
export class LlmsTxtDoc {}
