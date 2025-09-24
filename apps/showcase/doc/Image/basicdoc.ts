import { Code } from '@/domain/code';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ImageModule } from 'primeng/image';
import { AppCodeModule } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'basic-doc',
    standalone: true,
    imports: [AppDocSectionText, AppCodeModule, ImageModule, RouterModule],
    template: `
        <app-docsectiontext>
            <p>Image is used as the native <i>img</i> element and supports all properties that the native element has. For multiple image, see <a [routerLink]="['/galleria']">Galleria.</a></p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-image src="https://primefaces.org/cdn/primeng/images/galleria/galleria10.jpg" alt="Image" width="250" />
        </div>
        <app-code [code]="code" selector="image-basic-demo"></app-code>
    `
})
export class BasicDoc {
    code: Code = {
        basic: `<p-image src="https://primefaces.org/cdn/primeng/images/galleria/galleria10.jpg" alt="Image" width="250" />`,

        html: `<div class="card flex justify-center">
    <p-image src="https://primefaces.org/cdn/primeng/images/galleria/galleria10.jpg" alt="Image" width="250" />
</div>`,

        typescript: `import { Component } from '@angular/core';
import { Image } from 'primeng/image';

@Component({
    selector: 'image-basic-demo',
    templateUrl: './image-basic-demo.html',
    standalone: true,
    imports: [Image]
})
export class ImageBasicDemo {}`
    };
}
