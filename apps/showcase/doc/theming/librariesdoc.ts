import { Component } from '@angular/core';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'libraries-doc',
    standalone: true,
    imports: [AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>Example layer configuration for the popular CSS libraries.</p>
        </app-docsectiontext>
    `
})
export class LibrariesDoc {}
