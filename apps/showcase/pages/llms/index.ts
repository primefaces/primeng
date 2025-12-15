import { LlmsTxtDoc } from '@/doc/llms/llmstxtdoc';
import { LlmsFullTxtDoc } from '@/doc/llms/llmsfulltxtdoc';
import { MarkdownExtensionDoc } from '@/doc/llms/markdownextensiondoc';
import { Component } from '@angular/core';
import { AppDoc } from '@/components/doc/app.doc';

@Component({
    selector: 'llms-demo',
    standalone: true,
    imports: [AppDoc],
    template: ` <app-doc docTitle="LLMs.txt - PrimeNG" header="LLMs.txt" description="LLM-optimized documentation endpoints for PrimeNG components." [docs]="docs" docType="page"></app-doc> `
})
export class LLMsDemo {
    docs = [
        {
            id: 'llmstxt',
            label: '/llms.txt',
            component: LlmsTxtDoc
        },
        {
            id: 'llmsfulltxt',
            label: '/llms-full.txt',
            component: LlmsFullTxtDoc
        },
        {
            id: 'markdown',
            label: '.md extension',
            component: MarkdownExtensionDoc
        }
    ];
}
