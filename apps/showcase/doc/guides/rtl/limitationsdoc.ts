import { Component } from '@angular/core';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'limitations-doc',
    standalone: true,
    imports: [AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>RTL is widely supported by the UI suite except the Galleria and Carousel components. These components will be enhanced with a modern implementation in upcoming versions with built-in support for RTL.</p>
        </app-docsectiontext>
    `
})
export class LimitationsDoc {}
