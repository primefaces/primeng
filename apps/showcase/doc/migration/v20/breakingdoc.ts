import { Component } from '@angular/core';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'v20-breaking-doc',
    standalone: true,
    imports: [AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>Our team has put in great deal of effort while updating PrimeNG, and there are no filed breaking changes in v20.</p>
        </app-docsectiontext>
    `
})
export class BreakingDoc {}
