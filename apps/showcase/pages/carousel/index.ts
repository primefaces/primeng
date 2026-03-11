import { AppDoc } from '@/components/doc/app.doc';
import { AccessibilityDoc } from '@/doc/carousel/accessibility-doc';
import { BasicDoc } from '@/doc/carousel/basic-doc';
import { CircularDoc } from '@/doc/carousel/circular-doc';
import { ImportDoc } from '@/doc/carousel/import-doc';
import { PTComponent } from '@/doc/carousel/pt/PTComponent';
import { ResponsiveDoc } from '@/doc/carousel/responsive-doc';
import { VerticalDoc } from '@/doc/carousel/vertical-doc';
import { Component } from '@angular/core';

@Component({
    standalone: true,
    imports: [AppDoc],
    template: `
        <app-doc docTitle="Angular Carousel Component" header="Carousel" description="Carousel is a content slider featuring various customization options." [docs]="docs" [apiDocs]="['Carousel']" [ptDocs]="ptComponent" themeDocs="Carousel"></app-doc>
    `
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

    ptComponent = PTComponent;
}
