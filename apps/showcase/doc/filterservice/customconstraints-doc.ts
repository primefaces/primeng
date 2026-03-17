import { Component } from '@angular/core';
import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'custom-constraints-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>FilterService can be extended by adding new constraints using the <span>register</span> function.</p></app-docsectiontext
        >
        <app-code [hideToggleCode]="true"></app-code>
    `
})
export class CustomConstraintsDoc {}
