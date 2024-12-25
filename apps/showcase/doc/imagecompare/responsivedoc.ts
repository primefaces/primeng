import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'responsive-doc',
    standalone: false,
    template: `
        <app-docsectiontext>
            <p>Apply responsive styles to the container element to optimize display per screen size.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-imagecompare class="sm:!w-96 shadow-lg rounded-2xl">
                <ng-template #left>
                    <img src="https://primefaces.org/cdn/primevue/images/compare/island1.jpg" />
                </ng-template>
                <ng-template #right>
                    <img src="https://primefaces.org/cdn/primevue/images/compare/island2.jpg" />
                </ng-template>
            </p-imagecompare>
        </div>
        <app-code [code]="code" selector="image-compare-basic-demo"></app-code>
    `
})
export class ResponsiveDoc {
    code: Code = {
        basic: `<p-imagecompare class="sm:!w-96 shadow-lg rounded-2xl">
    <ng-template #left>
        <img src="https://primefaces.org/cdn/primevue/images/compare/island1.jpg" />
    </ng-template>
    <ng-template #right>
        <img src="https://primefaces.org/cdn/primevue/images/compare/island2.jpg" />
    </ng-template>
</p-imagecompare>`,

        html: `<div class="card flex justify-center">
    <p-imagecompare class="sm:!w-96 shadow-lg rounded-2xl">
        <ng-template #left>
            <img src="https://primefaces.org/cdn/primevue/images/compare/island1.jpg" />
        </ng-template>
        <ng-template #right>
            <img src="https://primefaces.org/cdn/primevue/images/compare/island2.jpg" />
        </ng-template>
    </p-imagecompare>
</div>`,

        typescript: `import { Component } from '@angular/core';
import { ImageCompareModule } from 'primeng/imagecompare';

@Component({
    selector: 'image-compare-responsive-demo',
    templateUrl: './image-compare-responsive-demo.html',
    standalone: true,
    imports: [ImageCompareModule]
})
export class ImageCompareResponsiveDemo {
}`
    };
}
