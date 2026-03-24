import { AppDoc } from '@/components/doc/app.doc';
import { AccessibilityDoc } from '@/doc/carousel/accessibility-doc';
import { BasicDoc } from '@/doc/carousel/basic-doc';
import { CircularDoc } from '@/doc/carousel/circular-doc';
import { PTComponent } from '@/doc/carousel/pt/PTComponent';
import { ResponsiveDoc } from '@/doc/carousel/responsive-doc';
import { UsageDoc } from '@/doc/carousel/usage-doc';
import { VerticalDoc } from '@/doc/carousel/vertical-doc';
import { CarouselBasicDoc } from '@/doc/carousel/carousel-basic-doc';
import { CarouselAlignmentDoc } from '@/doc/carousel/carousel-alignment-doc';
import { CarouselLoopDoc } from '@/doc/carousel/carousel-loop-doc';
import { CarouselOrientationDoc } from '@/doc/carousel/carousel-orientation-doc';
import { CarouselVariableSizeDoc } from '@/doc/carousel/carousel-variable-size-doc';
import { CarouselGalleryDoc } from '@/doc/carousel/carousel-gallery-doc';
import { Component } from '@angular/core';

@Component({
    standalone: true,
    imports: [AppDoc],
    template: `
        <app-doc
            docTitle="Angular Carousel Component"
            header="Carousel"
            description="Carousel is a content slider featuring various customization options."
            [docs]="docs"
            [apiDocs]="['Carousel']"
            [ptDocs]="ptComponent"
            themeDocs="Carousel"
            [heroDoc]="heroDoc"
        ></app-doc>
    `
})
export class CarouselDemo {
    heroDoc = BasicDoc;

    docs = [
        {
            id: 'usage',
            label: 'Usage',
            component: UsageDoc
        },
        {
            id: 'examples',
            label: 'Examples',
            children: [
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
                    id: 'carousel-basic',
                    label: 'Composition Basic',
                    component: CarouselBasicDoc
                },
                {
                    id: 'carousel-alignment',
                    label: 'Composition Alignment',
                    component: CarouselAlignmentDoc
                },
                {
                    id: 'carousel-loop',
                    label: 'Composition Loop',
                    component: CarouselLoopDoc
                },
                {
                    id: 'carousel-orientation',
                    label: 'Composition Orientation',
                    component: CarouselOrientationDoc
                },
                {
                    id: 'carousel-variable-size',
                    label: 'Composition Variable Size',
                    component: CarouselVariableSizeDoc
                },
                {
                    id: 'carousel-gallery',
                    label: 'Composition Gallery',
                    component: CarouselGalleryDoc
                }
            ]
        },
        {
            id: 'accessibility',
            label: 'Accessibility',
            component: AccessibilityDoc
        }
    ];

    ptComponent = PTComponent;
}
