import { AccessibilityDoc } from '@/doc/progressspinner/accessibility-doc';
import { BasicDoc } from '@/doc/progressspinner/basic-doc';
import { CustomDoc } from '@/doc/progressspinner/custom-doc';
import { UsageDoc } from '@/doc/progressspinner/usage-doc';
import { PTComponent } from '@/doc/progressspinner/pt/PTComponent';
import { Component } from '@angular/core';
import { AppDoc } from '@/components/doc/app.doc';

@Component({
    template: `<app-doc
        docTitle="Angular ProgressSpinner Component"
        header="ProgressSpinner"
        description="ProgressSpinner is a process status indicator."
        [docs]="docs"
        [heroDoc]="heroDoc"
        [ptDocs]="ptComponent"
        [apiDocs]="['ProgressSpinner']"
        themeDocs="progressspinner"
    ></app-doc>`,
    standalone: true,
    imports: [AppDoc]
})
export class ProgressSpinnerDemo {
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
                { id: 'basic', label: 'Basic', component: BasicDoc },
                { id: 'custom', label: 'Custom', component: CustomDoc }
            ]
        },
        {
            id: 'accessibility',
            label: 'Accessibility',
            component: AccessibilityDoc
        }
    ];
}
