import { Component } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'image-preview-demo',
    template: `
        <app-docsectiontext>
            <p>Preview mode displays a modal layer when the image is clicked that provides transformation options such as rotating and zooming.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-image src="https://primefaces.org/cdn/primeng/images/galleria/galleria1.jpg" alt="Image" width="250" [preview]="true"></p-image>
        </div>
        <app-code [code]="code" selector="image-preview-demo"></app-code>
    `
})
export class PreviewDoc {

    code: Code = {
        basic: `
<p-image src="https://primefaces.org/cdn/primeng/images/galleria/galleria1.jpg" alt="Image" width="250" [preview]="true"></p-image>`,

        html: `
<div class="card flex justify-content-center">
    <p-image src="https://primefaces.org/cdn/primeng/images/galleria/galleria1.jpg" alt="Image" width="250" [preview]="true"></p-image>
</div>`,

        typescript: `
import { Component } from '@angular/core';
import { PhotoService } from '../../service/photoservice';
        
@Component({
    selector: 'image-preview-demo',
    templateUrl: './image-preview-demo.html'
})
export class ImagePreviewDemo {
    constructor(private photoService: PhotoService) {}
}`,
        service: ['PhotoService']
    };
}
