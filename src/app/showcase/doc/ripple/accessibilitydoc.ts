import { Component } from '@angular/core';

@Component({
    selector: 'accessibility-doc',
    template: ` <app-docsectiontext>
        <h3>Screen Reader</h3>
        <p>Ripple element has the <i>aria-hidden</i> attribute as true so that it gets ignored by the screen readers.</p>

        <h3>Keyboard Support</h3>
        <p>Component does not include any interactive elements.</p>
    </app-docsectiontext>`
})
export class AccessibilityDoc {}
