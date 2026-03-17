import { Component } from '@angular/core';
import { ImageModule } from 'primeng/image';
import { AppCode } from '@/components/doc/app.code';
import { AppDemoWrapper } from '@/components/doc/app.demowrapper';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'preview-image-source-doc',
    standalone: true,
    imports: [AppDocSectionText, AppCode, AppDemoWrapper, ImageModule],
    template: `
        <app-docsectiontext>
            <p>In case that you want to show different image on preview, you can set <i>previewImageSrc</i> attribute. It could come handy when wanted to use smaller image version at first and bigger one on preview.</p>
        </app-docsectiontext>
        <app-demo-wrapper>
            <div class="flex justify-center">
                <p-image src="https://primefaces.org/cdn/primeng/images/galleria/galleria11.jpg" previewImageSrc="https://primefaces.org/cdn/primeng/images/galleria/galleria11.jpg" alt="Image" width="250" [preview]="true" />
            </div>
            <app-code></app-code>
        </app-demo-wrapper>
    `
})
export class PreviewImageSourceDoc {}
