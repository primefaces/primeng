import { AccessibilityDoc } from '@/doc/progressspinner/accessibilitydoc';
import { BasicDoc } from '@/doc/progressspinner/basicdoc';
import { CustomDoc } from '@/doc/progressspinner/customdoc';
import { ImportDoc } from '@/doc/progressspinner/importdoc';
import { ProgressSpinnerDocModule } from '@/doc/progressspinner/progressspinnerdoc.module';
import { Component } from '@angular/core';

@Component({
    template: `<app-doc docTitle="Angular ProgressSpinner Component" header="ProgressSpinner" description="ProgressSpinner is a process status indicator." [docs]="docs" [apiDocs]="['ProgressSpinner']" themeDocs="progressspinner"></app-doc>`,
    standalone: true,
    imports: [ProgressSpinnerDocModule]
})
export class ProgressSpinnerDemo {
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
