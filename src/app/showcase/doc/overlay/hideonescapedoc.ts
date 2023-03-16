import { Component, Input } from '@angular/core';

@Component({
    selector: 'hide-on-escape-doc',
    template: ` <div>
        <app-docsectiontext [title]="title" [id]="id">
            <p>The <i>hideOnEscape</i> determines to hide the overlay when escape key pressed. Accepts boolean, default value is 'false'.</p>
        </app-docsectiontext>
    </div>`
})
export class HideOnEscapeDoc {
    @Input() id: string;

    @Input() title: string;
}
