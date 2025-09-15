import { AccessibilityDoc } from '@/doc/progressbar/accessibilitydoc';
import { BasicDoc } from '@/doc/progressbar/basicdoc';
import { DynamicDoc } from '@/doc/progressbar/dynamicdoc';
import { ImportDoc } from '@/doc/progressbar/importdoc';
import { IndeterminateDoc } from '@/doc/progressbar/indeterminatedoc';
import { TemplateDoc } from '@/doc/progressbar/templatedoc';
import { Component } from '@angular/core';
import { AppDoc } from '@/components/doc/app.doc';

@Component({
    template: `<app-doc docTitle="Angular ProgressBar Component" header="ProgressBar" description="ProgressBar is a process status indicator." [docs]="docs" [apiDocs]="['ProgressBar']" themeDocs="progressbar"></app-doc>`,
    standalone: true,
    imports: [AppDoc]
})
export class ProgressBarDemo {
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
            id: 'dynamic',
            label: 'Dynamic',
            component: DynamicDoc
        },
        {
            id: 'template',
            label: 'Template',
            component: TemplateDoc
        },
        {
            id: 'indeterminate',
            label: 'Indeterminate',
            component: IndeterminateDoc
        },
        {
            id: 'accessibility',
            label: 'Accessibility',
            component: AccessibilityDoc
        }
    ];
}
