import { AppDoc } from '@/components/doc/app.doc';
import { AccessibilityDoc } from '@/doc/imagecompare/accessibility-doc';
import { BasicDoc } from '@/doc/imagecompare/basic-doc';
import { ImportDoc } from '@/doc/imagecompare/import-doc';
import { PTComponent } from '@/doc/imagecompare/pt/PTComponent';
import { ResponsiveDoc } from '@/doc/imagecompare/responsive-doc';
import { Component } from '@angular/core';

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
