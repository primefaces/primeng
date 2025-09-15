import { Component } from '@angular/core';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'ifta-label-accessibility-doc',
    standalone: true,
    imports: [AppDocSectionText],
    template: `
        <app-docsectiontext>
            <h3>Screen Reader</h3>
            <p>IftaLabel does not require any roles and attributes.</p>

            <h3>Keyboard Support</h3>
            <p>Component does not include any interactive elements.</p>
        </app-docsectiontext>
    `
})
export class AccessibilityDoc {}
