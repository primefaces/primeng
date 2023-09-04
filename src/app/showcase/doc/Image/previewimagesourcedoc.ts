import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'image-preview-source-demo',
    template: ` <section class="py-3">
        <app-docsectiontext [title]="title" [id]="id">
            <p>In case that you want to show different image on preview, you can set <i>previewImageSrc</i> attribute. It could come handy when wanted to use smaller image version at first and bigger one on preview.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-image src="https://primefaces.org/cdn/primeng/images/galleria/galleria1.jpg" previewImageSrc="https://primefaces.org/cdn/primeng/images/galleria/galleria2.jpg" alt="Image" width="250" [preview]="true"></p-image>
        </div>
        <app-code [code]="code" selector="image-preview-demo"></app-code>
    </section>`
})
export class PreviewImageSourceDoc {
    @Input() id: string;

    @Input() title: string;

    code: Code = {
        basic: `
<p-image src="https://primefaces.org/cdn/primeng/images/galleria/galleria1.jpg" previewImageSrc="https://primefaces.org/cdn/primeng/images/galleria/galleria2.jpg" alt="Image" width="250" [preview]="true"></p-image>`,

        html: `
<div class="card flex justify-content-center">
    <p-image src="https://primefaces.org/cdn/primeng/images/galleria/galleria1.jpg" previewImageSrc="https://primefaces.org/cdn/primeng/images/galleria/galleria2.jpg" alt="Image" width="250" [preview]="true"></p-image>
</div>`,

        typescript: `
import { Component } from '@angular/core';
import { PhotoService } from '../../service/photoservice';
        
@Component({
    selector: 'image-preview-source-demo',
    templateUrl: './image-preview-source-demo.html'
})
export class ImagePreviewDemo {
    constructor(private photoService: PhotoService) {}
}`,
        service: ['PhotoService']
    };
}
