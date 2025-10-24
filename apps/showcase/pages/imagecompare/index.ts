import { Component } from '@angular/core';
import { ImportDoc } from '../../doc/imagecompare/importdoc';
import { BasicDoc } from '../../doc/imagecompare/basicdoc';
import { AccessibilityDoc } from '../../doc/imagecompare/accessibilitydoc';
import { PTComponent } from '@/doc/imagecompare/pt/PTComponent';
import { ResponsiveDoc } from '@/doc/imagecompare/responsivedoc';
import { AppDoc } from '@/components/doc/app.doc';

@Component({
    template: `<app-doc
        docTitle="Angular ImageCompare Component"
        header="ImageCompare"
        description="Compare two images side by side with a slider."
        [docs]="docs"
        [apiDocs]="['ImageCompare']"
        [ptDocs]="ptComponent"
        themeDocs="imagecompare"
    ></app-doc> `,
    standalone: true,
    imports: [AppDoc]
})
export class ImageCompareDemo {
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
            id: 'responsive',
            label: 'Responsive',
            component: ResponsiveDoc
        },
        {
            id: 'accessibility',
            label: 'Accessibility',
            component: AccessibilityDoc
        }
    ];

    ptComponent = PTComponent;
}
