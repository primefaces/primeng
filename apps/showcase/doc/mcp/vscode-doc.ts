import { AppCodeModule } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';

@Component({
    selector: 'vscode-doc',
    standalone: true,
    imports: [AppCodeModule, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>Create <i>.vscode/mcp.json</i> in your project or <i>~/Library/Application Support/Code/User/mcp.json</i> for global configuration.</p>
        </app-docsectiontext>
        <app-code [hideToggleCode]="true"></app-code>
        <p class="doc-section-description">
            See <a href="https://code.visualstudio.com/docs/copilot/chat/mcp-servers" class="font-medium hover:underline text-primary" target="_blank" rel="noopener noreferrer">VS Code MCP Documentation</a> for more details.
        </p>
    `
})
export class VSCodeDoc {}
