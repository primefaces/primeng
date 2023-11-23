import { Component, Input, ViewChild } from '@angular/core';
import { AppDocSectionTextComponent } from '../../layout/doc/app.docsectiontext.component';

@Component({
    selector: 'style-doc',
    template: ` <section class="py-4">
        <app-docsectiontext [title]="title" [id]="id" [level]="3" #docsectiontext>
            <p>The <i>style</i> and <i>styleClass</i> are used to define styles that will be added to all overlay components. In addition, it can be used in <i>contentStyle</i> and <i>contentStyleClass</i> classes.</p>
        </app-docsectiontext>
    </section>`
})
export class StyleDoc {
    @Input() id: string;

    @Input() title: string;

    @ViewChild('docsectiontext', { static: true }) docsectiontext: AppDocSectionTextComponent;
}
