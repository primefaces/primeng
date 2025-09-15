import { Component } from '@angular/core';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'transition-options-doc',
    standalone: true,
    imports: [AppDocSectionText],
    template: ` <app-docsectiontext>
        <p>Transition options of the show or hide animation. The default value of <i>showTransitionOptions</i> is '.12s cubic-bezier(0, 0, 0.2, 1)' and the default value of <i>hideTransitionOptions</i> is '.1s linear'.</p>
    </app-docsectiontext>`
})
export class TransitionOptionsDoc {}
