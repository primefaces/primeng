import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'image-preview-demo',
    template: `
        <app-docsectiontext>
            <p>Preview mode displays a modal layer when the image is clicked that provides transformation options such as rotating and zooming.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-image src="https://primefaces.org/cdn/primeng/images/galleria/galleria10.jpg" alt="Image" width="250" [preview]="true" />
        </div>
        <app-code [code]="code" selector="image-preview-demo"></app-code>
    `
})
export class PreviewDoc {
    code: Code = {
        basic: `<p-image 
    src="https://primefaces.org/cdn/primeng/images/galleria/galleria10.jpg" 
    alt="Image" 
    width="250" 
    [preview]="true" />`,

        html: `<div class="card flex justify-center">
    <p-image 
        src="https://primefaces.org/cdn/primeng/images/galleria/galleria10.jpg"
        alt="Image" 
        width="250" 
        [preview]="true" />
</div>`,

        typescript: `import { Component } from '@angular/core';
import { ImageModule } from 'primeng/image';

@Component({
    selector: 'image-preview-demo',
    templateUrl: './image-preview-demo.html',
    standalone: true,
    imports: [ImageModule]
})
export class ImagePreviewDemo {
}`,
        service: ['PhotoService']
    };
}
