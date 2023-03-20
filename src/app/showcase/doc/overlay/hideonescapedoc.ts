import { Component, Input } from '@angular/core';

@Component({
    selector: 'hide-on-escape-doc',
    template: ` <section>
        <app-docsectiontext [title]="title" [id]="id">
            <p>The <i>hideOnEscape</i> determines to hide the overlay when escape key pressed. Accepts boolean, default value is <i>false</i>.</p>
        </app-docsectiontext>
    </section>`
})
export class HideOnEscapeDoc {
    @Input() id: string;

    @Input() title: string;
}
