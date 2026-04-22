import { AccessibilityDoc } from '@/doc/iftalabel/accessibility-doc';
import { BasicDoc } from '@/doc/iftalabel/basic-doc';
import { ImportDoc } from '@/doc/iftalabel/import-doc';
import { InvalidDoc } from '@/doc/iftalabel/invalid-doc';
import { PTComponent } from '@/doc/iftalabel/pt/PTComponent';
import { Component } from '@angular/core';
import { AppDoc } from '@/components/doc/app.doc';

@Component({
    standalone: true,
    imports: [AppDoc],
    template: `
        <app-doc docTitle="Angular Ifta Label Component" header="IftaLabel" description="IftaLabel is used to create infield top aligned labels." [docs]="docs" themeDocs="iftalabel" [apiDocs]="['IftaLabel']" [ptDocs]="ptComponent"></app-doc>
    `
})
export class IftaLabelDemo {
    ptComponent = PTComponent;
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
            id: 'invalid',
            label: 'Invalid',
            component: InvalidDoc
        },
        {
            id: 'accessibility',
            label: 'Accessibility',
            component: AccessibilityDoc
        }
    ];
}
