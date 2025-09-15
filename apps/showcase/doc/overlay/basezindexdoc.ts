import { Component } from '@angular/core';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'base-zindex-doc',
    standalone: true,
    imports: [AppDocSectionText],
    template: ` <app-docsectiontext>
        <p>The <i>baseZIndex</i> is base zIndex value to use in layering. Its default value is 0.</p>
    </app-docsectiontext>`
})
export class BaseZIndexDoc {}
