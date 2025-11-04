import { Component } from '@angular/core';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'auto-zindex-doc',
    standalone: true,
    imports: [AppDocSectionText],
    template: ` <app-docsectiontext>
        <p>The <i>autoZIndex</i> determines whether to automatically manage layering. Its default value is 'false'.</p>
    </app-docsectiontext>`
})
export class AutoZIndexDoc {}
