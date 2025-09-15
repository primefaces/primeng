import { Component } from '@angular/core';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'hide-on-escape-doc',
    standalone: true,
    imports: [AppDocSectionText],
    template: ` <app-docsectiontext>
        <p>The <i>hideOnEscape</i> determines to hide the overlay when escape key pressed. Accepts boolean, default value is <i>false</i>.</p>
    </app-docsectiontext>`
})
export class HideOnEscapeDoc {}
