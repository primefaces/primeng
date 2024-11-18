import { Component } from '@angular/core';

@Component({
    selector: 'fluid-accessibility-doc',
    template: `
        <app-docsectiontext>
            <h3>Screen Reader</h3>
            <p>Fluid does not require any roles and attributes.</p>

            <h3>Keyboard Support</h3>
            <p>Component does not include any interactive elements.</p>
        </app-docsectiontext>
    `
})
export class AccessibilityDoc {}
