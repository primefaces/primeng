import { Component } from '@angular/core';

@Component({
    selector: 'accessibility-doc',
    template: ` <div>
        <app-docsectiontext>
            <h3>Screen Reader</h3>
            <p>AnimateOnScroll does not require any roles and attributes.</p>
            <h3>Keyboard Support</h3>
            <p>Component does not include any interactive elements.</p>
        </app-docsectiontext>
    </div>`
})
export class AccessibilityDoc {}
