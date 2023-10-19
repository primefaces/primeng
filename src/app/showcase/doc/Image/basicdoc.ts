import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'basic-doc',
    template: ` <section class="py-4">
        <app-docsectiontext [title]="title" [id]="id">
            <p>Image is used as the native <i>img</i> element and supports all properties that the native element has. For multiple image, see <a [routerLink]="['/galleria']">Galleria.</a></p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-image src="https://primefaces.org/cdn/primeng/images/galleria/galleria1.jpg" alt="Image" width="250"></p-image>
        </div>
        <app-code [code]="code" selector="image-basic-demo"></app-code>
    </section>`
})
export class BasicDoc {
    @Input() id: string;

    @Input() title: string;

    code: Code = {
        basic: `
<p-image src="https://primefaces.org/cdn/primeng/images/galleria/galleria1.jpg" alt="Image" width="250"></p-image>`,

        html: `
<div class="card flex justify-content-center">
    <p-image src="https://primefaces.org/cdn/primeng/images/galleria/galleria1.jpg" alt="Image" width="250"></p-image>
</div>`,

        typescript: `
import { Component } from '@angular/core';
        
@Component({
    selector: 'image-basic-demo',
    templateUrl: './image-basic-demo.html'
})
export class ImageBasicDemo {}`
    };
}
