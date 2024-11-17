import { AccessibilityDoc } from '@/doc/carousel/accessibilitydoc';
import { BasicDoc } from '@/doc/carousel/basicdoc';
import { CarouselDocModule } from '@/doc/carousel/carouseldoc.module';
import { CircularDoc } from '@/doc/carousel/circulardoc';
import { ImportDoc } from '@/doc/carousel/importdoc';
import { ResponsiveDoc } from '@/doc/carousel/responsivedoc';
import { VerticalDoc } from '@/doc/carousel/verticaldoc';
import { Component } from '@angular/core';

@Component({
    standalone: true,
    imports: [CarouselDocModule],
    template: ` <app-doc docTitle="Angular Carousel Component" header="Carousel" description="Carousel is a content slider featuring various customization options." [docs]="docs" [apiDocs]="['Carousel']" themeDocs="Carousel"></app-doc> `
    // styles: [
    //     `
    //         :host ::ng-deep {
    //             .product-item {
    //                 .product-item-content {
    //                     border: 1px solid var(--surface-d);
    //                     border-radius: 3px;
    //                     margin: 0.3rem;
    //                     text-align: center;
    //                     padding: 2rem 0;
    //                 }
    //
    //                 .product-image {
    //                     width: 50%;
    //                     box-shadow:
    //                         0 3px 6px rgba(0, 0, 0, 0.16),
    //                         0 3px 6px rgba(0, 0, 0, 0.23);
    //                 }
    //             }
    //         }
    //     `,
    // ],
})
export class CarouselDemo {
    docs = [
        {
            id: 'import',
            label: 'Import',
            component: ImportDoc
        },
        {
            id: 'basic',
            label: 'Basic',
            component: BasicDoc
        },
        {
            id: 'circular',
            label: 'Circular',
            component: CircularDoc
        },
        {
            id: 'responsive',
            label: 'Responsive',
            component: ResponsiveDoc
        },
        {
            id: 'vertical',
            label: 'Vertical',
            component: VerticalDoc
        },
        {
            id: 'accessibility',
            label: 'Accessibility',
            component: AccessibilityDoc
        }
    ];
}
