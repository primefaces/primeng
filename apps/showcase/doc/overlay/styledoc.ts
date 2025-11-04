import { Component } from '@angular/core';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'style-doc',
    standalone: true,
    imports: [AppDocSectionText],
    template: ` <app-docsectiontext>
        <p>The <i>style</i> and <i>styleClass</i> are used to define styles that will be added to all overlay components. In addition, it can be used in <i>contentStyle</i> and <i>contentStyleClass</i> classes.</p>
    </app-docsectiontext>`
})
export class StyleDoc {}
