import { AccessibilityDoc } from '@/doc/progressbar/accessibility-doc';
import { BasicDoc } from '@/doc/progressbar/basic-doc';
import { DynamicDoc } from '@/doc/progressbar/dynamic-doc';
import { UsageDoc } from '@/doc/progressbar/usage-doc';
import { IndeterminateDoc } from '@/doc/progressbar/indeterminate-doc';
import { PTComponent } from '@/doc/progressbar/pt/PTComponent';
import { TemplateDoc } from '@/doc/progressbar/template-doc';
import { Component } from '@angular/core';
import { AppDoc } from '@/components/doc/app.doc';

@Component({
    template: `<app-doc
        docTitle="Angular ProgressBar Component"
        header="ProgressBar"
        description="ProgressBar is a process status indicator."
        [docs]="docs"
        [heroDoc]="heroDoc"
        [ptDocs]="ptComponent"
        [apiDocs]="['ProgressBar']"
        themeDocs="progressbar"
    ></app-doc>`,
    standalone: true,
    imports: [AppDoc]
})
export class ProgressBarDemo {
    ptComponent = PTComponent;
    heroDoc = BasicDoc;

    docs = [
        {
            id: 'usage',
            label: 'Usage',
            component: UsageDoc
        },
        {
            id: 'examples',
            label: 'Examples',
            children: [
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
                }
            ]
        },
        {
            id: 'accessibility',
            label: 'Accessibility',
            component: AccessibilityDoc
        }
    ];
}
