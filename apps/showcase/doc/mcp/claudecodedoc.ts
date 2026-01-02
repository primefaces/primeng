import { AppCodeModule } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';

@Component({
    selector: 'claudecode-doc',
    standalone: true,
    imports: [AppCodeModule, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>Add the PrimeNG MCP server using the CLI. After adding, start a new session and use <i>/mcp</i> to verify the connection.</p>
        </app-docsectiontext>
        <app-code [hideToggleCode]="true"></app-code>
        <p class="doc-section-description">
            See <a href="https://docs.anthropic.com/en/docs/claude-code/mcp" class="font-medium hover:underline text-primary" target="_blank" rel="noopener noreferrer">Claude Code MCP Documentation</a> for more details.
        </p>
    `
})
export class ClaudeCodeDoc {}
