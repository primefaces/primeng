import { Component } from '@angular/core';
import { ImageModule } from 'primeng/image';
import { AppCode } from '@/components/doc/app.code';
import { AppDemoWrapper } from '@/components/doc/app.demowrapper';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'preview-doc',
    standalone: true,
    imports: [AppDocSectionText, AppCode, AppDemoWrapper, ImageModule],
    template: `
        <app-docsectiontext>
            <p>Preview mode displays a modal layer when the image is clicked that provides transformation options such as rotating and zooming.</p>
        </app-docsectiontext>
        <app-demo-wrapper>
            <div class="flex justify-center">
                <p-image src="https://primefaces.org/cdn/primeng/images/galleria/galleria10.jpg" alt="Image" width="250" [preview]="true" />
            </div>
            <app-code></app-code>
        </app-demo-wrapper>
    `
})
export class PreviewDoc {}
