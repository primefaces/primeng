import { AppCodeModule } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'quickstart-doc',
    standalone: true,
    imports: [AppCodeModule, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>The easiest way to use this MCP server is with <code>npx</code> - no installation required:</p>
        </app-docsectiontext>
        <app-code [code]="code" [hideToggleCode]="true"></app-code>
    `
})
export class QuickStartDoc {
    code: Code = {
        command: `npx @primeng/mcp`
    };
}
