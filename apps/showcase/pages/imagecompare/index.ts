import { Component } from '@angular/core';
import { ImportDoc } from '../../doc/imagecompare/importdoc';
import { ImageCompareDocModule } from '../../doc/imagecompare/imagecomparedoc.module';
import { BasicDoc } from '../../doc/imagecompare/basicdoc';
import { AccessibilityDoc } from '../../doc/imagecompare/accessibilitydoc';
import { ResponsiveDoc } from '@/doc/imagecompare/responsivedoc';

@Component({
    template: `<app-doc docTitle="Angular ImageCompare Component" header="ImageCompare" description="Compare two images side by side with a slider." [docs]="docs" [apiDocs]="['ImageCompare']" themeDocs="imagecompare"></app-doc> `,
    standalone: true,
    imports: [ImageCompareDocModule]
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
}
