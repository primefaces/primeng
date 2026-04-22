import { Component } from '@angular/core';
import { ImageCompareModule } from 'primeng/imagecompare';
import { AppCodeModule } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'responsive-doc',
    standalone: true,
    imports: [AppDocSectionText, AppCodeModule, ImageCompareModule],
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
        <app-code></app-code>
    `
})
export class ResponsiveDoc {}
