import { Component, Input, ViewChild } from '@angular/core';
import { AppDocSectionTextComponent } from '../../layout/doc/app.docsectiontext.component';

@Component({
    selector: 'hide-on-escape-doc',
    template: ` <app-docsectiontext>
        <p>The <i>hideOnEscape</i> determines to hide the overlay when escape key pressed. Accepts boolean, default value is <i>false</i>.</p>
    </app-docsectiontext>`
})
export class HideOnEscapeDoc {}
