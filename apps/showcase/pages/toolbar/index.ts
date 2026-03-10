import { BasicDoc } from '@/doc/toolbar/basic-doc';
import { UsageDoc } from '@/doc/toolbar/usage-doc';
import { Component } from '@angular/core';
import { AccessibilityDoc } from '@/doc/toolbar/accessibility-doc';
import { CustomDoc } from '@/doc/toolbar/custom-doc';
import { PTComponent } from '@/doc/toolbar/pt/PTComponent';
import { AppDoc } from '@/components/doc/app.doc';

@Component({
    template: `<app-doc
        docTitle="Angular Toolbar Component"
        header="Toolbar"
        description="Toolbar is a grouping component for buttons and other content."
        [docs]="docs"
        [apiDocs]="['Toolbar']"
        [ptDocs]="ptComponent"
        themeDocs="toolbar"
        [heroDoc]="heroDoc"
    ></app-doc>`,
    standalone: true,
    imports: [AppDoc]
})
export class ToolbarDemo {
    heroDoc = BasicDoc;
    ptComponent = PTComponent;
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
                    id: 'custom',
                    label: 'Custom',
                    component: CustomDoc
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
