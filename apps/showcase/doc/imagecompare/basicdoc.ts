import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'basic-doc',
    template: `
        <app-docsectiontext>
            <p>Images are defined using templating with <i>left</i> and <i>right</i> slots. Use the <i>style</i> or <i>class</i> properties to define the size of the container.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-imagecompare class="shadow-lg rounded-2xl">
                <ng-container left>
                    <img src="https://primefaces.org/cdn/primevue/images/compare/island1.jpg" />
                </ng-container>
                <ng-container right>
                    <img src="https://primefaces.org/cdn/primevue/images/compare/island2.jpg" />
                </ng-container>
            </p-imagecompare>
        </div>
        <app-code [code]="code" selector="image-compare-basic-demo"></app-code>
    `
})
export class BasicDoc {
    code: Code = {
        basic: `<p-imagecompare class="shadow-lg rounded-2xl">
    <ng-container left>
        <img src="https://primefaces.org/cdn/primevue/images/compare/island1.jpg" />
    </ng-container>
    <ng-container right>
        <img src="https://primefaces.org/cdn/primevue/images/compare/island2.jpg" />
    </ng-container>
</p-imagecompare>`,

        html: `<div class="card flex justify-center">
    <p-imagecompare class="shadow-lg rounded-2xl">
        <ng-container left>
            <img src="https://primefaces.org/cdn/primevue/images/compare/island1.jpg" />
        </ng-container>
        <ng-container right>
            <img src="https://primefaces.org/cdn/primevue/images/compare/island2.jpg" />
        </ng-container>
    </p-imagecompare>
</div>`,

        typescript: `import { Component } from '@angular/core';
import { ImageCompareModule } from 'primeng/imagecompare';

@Component({
    selector: 'image-compare-basic-demo',
    templateUrl: './image-compare-basic-demo.html',
    standalone: true,
    imports: [ImageCompareModule]
})
export class ImageCompareBasicDemo {
}`
    };
}
