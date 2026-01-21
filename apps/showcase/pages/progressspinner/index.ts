import { AccessibilityDoc } from '@/doc/progressspinner/accessibility-doc';
import { BasicDoc } from '@/doc/progressspinner/basic-doc';
import { CustomDoc } from '@/doc/progressspinner/custom-doc';
import { ImportDoc } from '@/doc/progressspinner/import-doc';
import { PTComponent } from '@/doc/progressspinner/pt/PTComponent';
import { Component } from '@angular/core';
import { AppDoc } from '@/components/doc/app.doc';

@Component({
    template: `<app-doc
        docTitle="Angular ProgressSpinner Component"
        header="ProgressSpinner"
        description="ProgressSpinner is a process status indicator."
        [docs]="docs"
        [ptDocs]="ptComponent"
        [apiDocs]="['ProgressSpinner']"
        themeDocs="progressspinner"
    ></app-doc>`,
    standalone: true,
    imports: [AppDoc]
})
export class ProgressSpinnerDemo {
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
            id: 'custom',
            label: 'Custom',
            component: CustomDoc
        },
        {
            id: 'accessibility',
            label: 'Accessibility',
            component: AccessibilityDoc
        }
    ];
}
