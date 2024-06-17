import { Component } from '@angular/core';

@Component({
    selector: 'accessibility-doc',
    template: ` <app-docsectiontext>
        <h3>Screen Reader</h3>
        <p>Scroller uses a semantic list element to list the items. No specific role is enforced, still you may use any aria role and attributes as any valid attribute is passed to the container element.</p>
        <h4>Keyboard Support</h4>
        <p>Component does not include any built-in interactive elements.</p>
    </app-docsectiontext>`
})
export class AccessibilityDoc {}
