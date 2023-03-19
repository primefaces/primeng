import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'image-indicator-template-demo',
    template: ` <section>
        <app-docsectiontext [title]="title" [id]="id">
            <p>Image is used as the native <i>img</i> element and supports all properties that the native element has.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-image src="https://primefaces.org/cdn/primeng/images/galleria/galleria1.jpg" alt="Image" width="250">
                <ng-template pTemplate="indicator"> Indicator Content </ng-template>
            </p-image>
        </div>
        <app-code [code]="code" selector="image-indicator-template-demo"></app-code>
    </section>`
})
export class ImageIndicatorTemplateDemo {
    @Input() id: string;

    @Input() title: string;

    code: Code = {
        basic: `
<p-image src="https://primefaces.org/cdn/primeng/images/galleria/galleria1.jpg" alt="Image" width="250">
    <ng-template pTemplate="indicator">
        Indicator Content
    </ng-template>
</p-image>`,

        html: `
<div class="card flex justify-content-center">
    <p-image src="https://primefaces.org/cdn/primeng/images/galleria/galleria1.jpg" alt="Image" width="250">
        <ng-template pTemplate="indicator">
            Indicator Content
        </ng-template>
    </p-image>
</div>`,

        typescript: `
import { Component } from '@angular/core';
        
@Component({
    selector: 'image-indicator-template-demo',
    templateUrl: './image-indicator-template-demo.html'
})
export class ImageIndicatorTemplateDemo {}`
    };
}
