import { Component, Input } from '@angular/core';

@Component({
    selector: 'accessibility-doc',
    template: ` <app-docsectiontext [title]="title" [id]="id">
        <h3>Screen Reader</h3>
        <p>
            BlockUI manages <i>aria-busy</i> state attribute when the UI gets blocked and unblocked. Any valid attribute is passed to the root element so additional attributes like <i>role</i> and <i>aria-live</i> can be used to define live regions.
        </p>

        <h3>Keyboard Support</h3>
        <p>Component does not include any interactive elements.</p>
    </app-docsectiontext>`
})
export class AccessibilityDoc {
    @Input() id: string;

    @Input() title: string;
}
