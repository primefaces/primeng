import { AppDocModule } from '@/components/doc/app.doc.module';
import { Component } from '@angular/core';

@Component({
    selector: 'v20-breaking-doc',
    imports: [AppDocModule],
    template: `
        <app-docsectiontext>
            <p>Our team has put in great deal of effort while updating PrimeNG, and there are no filed breaking changes in v20.</p>
        </app-docsectiontext>
    `
})
export class BreakingDoc {}
