import { Component } from '@angular/core';
import { ImportDoc } from '@doc/iftalabel/importdoc';
import { BasicDoc } from '@doc/iftalabel/basicdoc';
import { IftaLabelDocModule } from '@doc/iftalabel/iftalabeldoc.module';
import { InvalidDoc } from '@doc/iftalabel/invaliddoc';
import { AccessibilityDoc } from '@doc/iftalabel/accessibilitydoc';

@Component({
    standalone: true,
    imports: [IftaLabelDocModule],
    template: `
        <app-doc
            docTitle="Angular Ifta Label Component"
            header="IftaLabel"
            description="IftaLabel is used to create infield top aligned labels."
            [docs]="docs"
            themeDocs="iftalabel"
        ></app-doc>
    `,
})
export class IftaLabelDemo {
    docs = [
        {
            id: 'import',
            label: 'Import',
            component: ImportDoc,
        },
        {
            id: 'basic',
            label: 'Basic',
            component: BasicDoc,
        },
        {
            id: 'invalid',
            label: 'Invalid',
            component: InvalidDoc,
        },
        {
            id: 'accessibility',
            label: 'Accessibility',
            component: AccessibilityDoc
        },
    ];
}
