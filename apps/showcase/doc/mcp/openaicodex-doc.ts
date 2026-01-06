import { AppCodeModule } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';

@Component({
    selector: 'openaicodex-doc',
    standalone: true,
    imports: [AppCodeModule, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>Add the PrimeNG MCP server using the CLI or edit <i>~/.codex/config.toml</i> directly.</p>
        </app-docsectiontext>
        <app-code [hideToggleCode]="true"></app-code>
        <p class="doc-section-description">See <a href="https://developers.openai.com/codex/mcp/" class="font-medium hover:underline text-primary" target="_blank" rel="noopener noreferrer">OpenAI Codex MCP Documentation</a> for more details.</p>
    `
})
export class OpenAICodexDoc {}
