import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'image-preview-source-demo',
    template: `
        <app-docsectiontext>
            <p>In case that you want to show different image on preview, you can set <i>previewImageSrc</i> attribute. It could come handy when wanted to use smaller image version at first and bigger one on preview.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-image src="https://primefaces.org/cdn/primeng/images/galleria/galleria11.jpg" previewImageSrc="https://primefaces.org/cdn/primeng/images/galleria/galleria11.jpg" alt="Image" width="250" [preview]="true" />
        </div>
        <app-code [code]="code" selector="image-preview-source-demo"></app-code>
    `
})
export class PreviewImageSourceDoc {
    code: Code = {
        basic: `<p-image 
    src="https://primefaces.org/cdn/primeng/images/galleria/galleria11.jpg" 
    previewImageSrc="https://primefaces.org/cdn/primeng/images/galleria/galleria11.jpg" 
    alt="Image" 
    width="250" 
    [preview]="true" />`,

        html: `<div class="card flex justify-content-center">
    <p-image 
        src="https://primefaces.org/cdn/primeng/images/galleria/galleria11.jpg" 
        previewImageSrc="https://primefaces.org/cdn/primeng/images/galleria/galleria11.jpg" 
        alt="Image" 
        width="250" 
        [preview]="true" />
</div>`,

        typescript: `import { Component } from '@angular/core';
import { ImageModule } from 'primeng/image';
        
@Component({
    selector: 'image-preview-source-demo',
    templateUrl: './image-preview-source-demo.html',
    standalone: true,
    imports: [ImageModule]
})
export class ImagePreviewSourceDemo {

}`,
        service: ['PhotoService']
    };
}
