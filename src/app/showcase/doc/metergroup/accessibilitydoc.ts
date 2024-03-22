import { Component } from '@angular/core';

@Component({
    selector: 'accessibility-doc',
    template: `
        <app-docsectiontext>
            <h3>Screen Reader</h3>
            <p>MeterGroup component uses <i>meter</i> role in addition to the <i>aria-valuemin</i>, <i>aria-valuemax</i> and <i>aria-valuenow</i> attributes. Value to describe the component can be defined using <i>aria-labelledby</i> prop.</p>

            <h3>Keyboard Support</h3>
            <p>Component does not include any interactive elements.</p>
        </app-docsectiontext>
    `
})
export class AccessibilityDoc {}
