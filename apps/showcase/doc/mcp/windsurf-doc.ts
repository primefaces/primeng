import { AppCodeModule } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';

@Component({
    selector: 'windsurf-doc',
    standalone: true,
    imports: [AppCodeModule, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>Edit <i>~/.codeium/windsurf/mcp_config.json</i> to add the PrimeNG MCP server.</p>
        </app-docsectiontext>
        <app-code [hideToggleCode]="true"></app-code>
        <p class="doc-section-description">See <a href="https://docs.windsurf.com/windsurf/cascade/mcp" class="font-medium hover:underline text-primary" target="_blank" rel="noopener noreferrer">Windsurf MCP Documentation</a> for more details.</p>
    `
})
export class WindsurfDoc {}
