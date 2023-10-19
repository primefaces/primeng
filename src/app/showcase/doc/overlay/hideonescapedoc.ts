import { Component, Input, ViewChild } from '@angular/core';
import { AppDocSectionTextComponent } from '../../layout/doc/docsectiontext/app.docsectiontext.component';

@Component({
    selector: 'hide-on-escape-doc',
    template: ` <section class="py-4">
        <app-docsectiontext [title]="title" [id]="id" [level]="3" #docsectiontext>
            <p>The <i>hideOnEscape</i> determines to hide the overlay when escape key pressed. Accepts boolean, default value is <i>false</i>.</p>
        </app-docsectiontext>
    </section>`
})
export class HideOnEscapeDoc {
    @Input() id: string;

    @Input() title: string;

    @ViewChild('docsectiontext', { static: true }) docsectiontext: AppDocSectionTextComponent;
}
