import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'tokens-set-doc',
    standalone: true,
    imports: [CommonModule, AppDocSectionText],
    template: `<app-docsectiontext>
        <p>
            The theming architecture is based on primitive, semantic and components tokens. The visual editor, displays a dedicated section for each set. For basic purposes such as customizing the primary and surface colors, primitive and semantic
            sections would be more than enough. The component tokens are displayed per route so navigate to the component page first to view the tokens of the specific component.
        </p>
    </app-docsectiontext>`
})
export class TokenSetsDoc {}
