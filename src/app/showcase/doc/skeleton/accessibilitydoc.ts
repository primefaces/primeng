import { Component, Input } from '@angular/core';

@Component({
    selector: 'accessibility-doc',
    template: ` <app-developmentsection>
        <div>
            <app-docsectiontext [title]="title" [id]="id">
                <h3>Screen Reader</h3>
                <p>
                    Skeleton uses <i>aria-hidden</i> as "true" so that it gets ignored by screen readers, any valid attribute is passed to the root element so you may customize it further if required. If multiple skeletons are grouped inside a
                    container, you may use <i>aria-busy</i> on the container element as well to indicate the loading process.
                </p>
            </app-docsectiontext>

            <h3>Keyboard Support</h3>
            <p>Component does not include any interactive elements.</p>
        </div>
    </app-developmentsection>`
})
export class AccessibilityDoc {
    @Input() id: string;

    @Input() title: string;
}
