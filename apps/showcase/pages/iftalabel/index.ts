import { AccessibilityDoc } from '@/doc/iftalabel/accessibilitydoc';
import { BasicDoc } from '@/doc/iftalabel/basicdoc';
import { ImportDoc } from '@/doc/iftalabel/importdoc';
import { InvalidDoc } from '@/doc/iftalabel/invaliddoc';
import { Component } from '@angular/core';
import { AppDoc } from '@/components/doc/app.doc';

@Component({
    standalone: true,
    imports: [AppDoc],
    template: ` <app-doc docTitle="Angular Ifta Label Component" header="IftaLabel" description="IftaLabel is used to create infield top aligned labels." [docs]="docs" themeDocs="iftalabel" [apiDocs]="['IftaLabel']"></app-doc> `
})
export class IftaLabelDemo {
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
