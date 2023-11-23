import { Component, Input, ViewChild } from '@angular/core';
import { AppDocSectionTextComponent } from '../../layout/doc/app.docsectiontext.component';

@Component({
    selector: 'base-zindex-doc',
    template: ` <section class="py-4">
        <app-docsectiontext [title]="title" [id]="id" [level]="3" #docsectiontext>
            <p>The <i>baseZIndex</i> is base zIndex value to use in layering. Its default value is 0.</p>
        </app-docsectiontext>
    </section>`
})
export class BaseZIndexDoc {
    @Input() id: string;

    @Input() title: string;

    @ViewChild('docsectiontext', { static: true }) docsectiontext: AppDocSectionTextComponent;
}
