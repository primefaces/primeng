import { Component } from '@angular/core';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'introduction-doc',
    standalone: true,
    imports: [AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>
                <a href="https://modelcontextprotocol.io/" target="_blank" rel="noopener noreferrer">Model Context Protocol (MCP)</a> is an open standard that enables AI models to connect with external <i>tools</i> and <i>data sources</i>. The
                PrimeNG MCP server provides AI assistants with comprehensive access to:
            </p>
            <ul class="leading-loose list-disc ml-6">
                <li>Component documentation including <i>props</i>, <i>events</i>, <i>templates</i>, and <i>methods</i></li>
                <li>Theming and styling with <i>Pass Through</i> and <i>design tokens</i></li>
                <li>Code examples and usage patterns</li>
                <li>Migration guides for version upgrades</li>
                <li>Installation and configuration guides</li>
            </ul>
        </app-docsectiontext>
    `
})
export class IntroductionDoc {}
