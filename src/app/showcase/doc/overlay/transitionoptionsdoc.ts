import { Component, Input, ViewChild } from '@angular/core';
import { AppDocSectionTextComponent } from '../../layout/doc/docsectiontext/app.docsectiontext.component';

@Component({
    selector: 'transition-options-doc',
    template: ` <section>
        <app-docsectiontext [title]="title" [id]="id" [level]="3" #docsectiontext>
            <p>Transition options of the show or hide animation. The default value of <i>showTransitionOptions</i> is '.12s cubic-bezier(0, 0, 0.2, 1)' and the default value of <i>hideTransitionOptions</i> is '.1s linear'.</p>
        </app-docsectiontext>
    </section>`
})
export class TransitionOptionsDoc {
    @Input() id: string;

    @Input() title: string;

    @ViewChild('docsectiontext', { static: true }) docsectiontext: AppDocSectionTextComponent;
}
