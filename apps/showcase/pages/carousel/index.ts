import { AppDoc } from '@/components/doc/app.doc';
import { AccessibilityDoc } from '@/doc/carousel/accessibility-doc';
import { BasicDoc } from '@/doc/carousel/basic-doc';
import { AlignmentDoc } from '@/doc/carousel/alignment-doc';
import { LoopDoc } from '@/doc/carousel/loop-doc';
import { OrientationDoc } from '@/doc/carousel/orientation-doc';
import { VariableSizeDoc } from '@/doc/carousel/variable-size-doc';
import { GalleryDoc } from '@/doc/carousel/gallery-doc';
import { PTComponent } from '@/doc/carousel/pt/PTComponent';
import { UsageDoc } from '@/doc/carousel/usage-doc';
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
            [apiDocs]="['Carousel', 'CarouselContent', 'CarouselItem', 'CarouselIndicators', 'CarouselNext', 'CarouselPrev', 'CarouselIndicator']"
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
                    id: 'alignment',
                    label: 'Alignment',
                    component: AlignmentDoc
                },
                {
                    id: 'loop',
                    label: 'Loop',
                    component: LoopDoc
                },
                {
                    id: 'orientation',
                    label: 'Orientation',
                    component: OrientationDoc
                },
                {
                    id: 'variable-size',
                    label: 'Variable Size',
                    component: VariableSizeDoc
                },
                {
                    id: 'gallery',
                    label: 'Gallery',
                    component: GalleryDoc
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
