import { Component } from '@angular/core';
import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'usage-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p><i>FilterService</i> needs to be injected into your component. Filters are accessed with <i>FilterService.filters</i>.</p>
        </app-docsectiontext>
        <app-code [hideToggleCode]="true"></app-code>
    `
})
export class UsageDoc {}
