import { Component } from '@angular/core';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'keypoints-doc',
    standalone: true,
    imports: [AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>
                PrimeNG has several add-ons such as UI Kit, Premium Templates, and Blocks that rely on design tokens and styling. Any core structural changes, such as adding new props, events, or updating design tokens, should be communicated with
                the core team to ensure consistency and compatibility.
            </p>
        </app-docsectiontext>
    `
})
export class KeyPointsDoc {}
