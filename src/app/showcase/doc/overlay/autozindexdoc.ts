import { Component, Input, ViewChild } from '@angular/core';
import { AppDocSectionTextComponent } from '../../layout/doc/docsectiontext/app.docsectiontext.component';

@Component({
    selector: 'auto-zindex-doc',
    template: ` <section>
        <app-docsectiontext [title]="title" [id]="id" [level]="3" #docsectiontext>
            <p>The <i>autoZIndex</i> determines whether to automatically manage layering. Its default value is 'false'.</p>
        </app-docsectiontext>
    </section>`
})
export class AutoZIndexDoc {
    @Input() id: string;

    @Input() title: string;

    @ViewChild('docsectiontext', { static: true }) docsectiontext: AppDocSectionTextComponent;
}
