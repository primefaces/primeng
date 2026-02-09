import { Component } from '@angular/core';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'font-doc',
    standalone: true,
    imports: [AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>There is no design for fonts as UI components inherit their font settings from the application.</p>
        </app-docsectiontext>
    `
})
export class FontDoc {}
