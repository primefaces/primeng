import { AppCodeModule } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'zed-doc',
    standalone: true,
    imports: [AppCodeModule, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>Add to your Zed settings at <i>~/.config/zed/settings.json</i> (Linux) or <i>~/Library/Application Support/Zed/settings.json</i> (macOS).</p>
        </app-docsectiontext>
        <app-code [code]="code" [hideToggleCode]="true"></app-code>
        <p class="doc-section-description">See <a href="https://zed.dev/docs/ai/mcp" class="font-medium hover:underline text-primary" target="_blank" rel="noopener noreferrer">Zed MCP Documentation</a> for more details.</p>
    `
})
export class ZedDoc {
    code: Code = {
        typescript: `{
    "context_servers": {
        "primeng": {
            "command": {
                "path": "npx",
                "args": ["-y", "@primeng/mcp"]
            }
        }
    }
}`
    };
}
