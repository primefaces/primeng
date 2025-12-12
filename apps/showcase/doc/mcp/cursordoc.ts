import { AppCodeModule } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'cursor-doc',
    standalone: true,
    imports: [AppCodeModule, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>Create <i>.cursor/mcp.json</i> in your project or <i>~/.cursor/mcp.json</i> for global configuration.</p>
        </app-docsectiontext>
        <app-code [code]="code" [hideToggleCode]="true"></app-code>
        <p class="doc-section-description">
            See <a href="https://docs.cursor.com/context/model-context-protocol" class="font-medium hover:underline text-primary" target="_blank" rel="noopener noreferrer">Cursor MCP Documentation</a> for more details.
        </p>
    `
})
export class CursorDoc {
    code: Code = {
        basic: `{
    "mcpServers": {
        "primeng": {
            "command": "npx",
            "args": ["-y", "@primeng/mcp"]
        }
    }
}`
    };
}
