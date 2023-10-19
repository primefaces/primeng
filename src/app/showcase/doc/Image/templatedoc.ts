import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'template-doc',
    template: ` <section class="py-4">
        <app-docsectiontext [title]="title" [id]="id">
            <p>An eye icon is displayed by default when the image is hovered in preview mode. Use the <i>indicator</i> template for custom content.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-image src="https://primefaces.org/cdn/primeng/images/galleria/galleria1.jpg" [preview]="true" alt="Image" width="250">
                <ng-template pTemplate="indicator">
                    <i class="pi pi-check"></i>
                </ng-template>
            </p-image>
        </div>
        <app-code [code]="code" selector="image-template-demo"></app-code>
    </section>`
})
export class TemplateDoc {
    @Input() id: string;

    @Input() title: string;

    code: Code = {
        basic: `
<p-image src="https://primefaces.org/cdn/primeng/images/galleria/galleria1.jpg" [preview]="true" alt="Image" width="250">
    <ng-template pTemplate="indicator">
        <i class="pi pi-check"></i>
    </ng-template>
</p-image>`,

        html: `
<div class="card flex justify-content-center">
    <p-image src="https://primefaces.org/cdn/primeng/images/galleria/galleria1.jpg" [preview]="true" alt="Image" width="250">
        <ng-template pTemplate="indicator">
            <i class="pi pi-check"></i>
        </ng-template>
    </p-image>
</div>`,

        typescript: `
import { Component } from '@angular/core';
        
@Component({
    selector: 'image-template-demo',
    templateUrl: './image-template-demo.html'
})
export class ImageTemplateDemo {}`
    };
}
