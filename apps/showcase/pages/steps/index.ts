import { AccessibilityDoc } from '@/doc/steps/accessibility-doc';
import { BasicDoc } from '@/doc/steps/basic-doc';
import { ControlledDoc } from '@/doc/steps/controlled-doc';
import { ImportDoc } from '@/doc/steps/import-doc';
import { InteractiveDoc } from '@/doc/steps/interactive-doc';
import { RoutingDoc } from '@/doc/steps/routing-doc';
import { AppDoc } from '@/components/doc/app.doc';
import { Component } from '@angular/core';

@Component({
    template: `<app-doc
        docTitle="Angular Steps Component"
        header="Steps"
        description="Steps also known as Stepper, is an indicator for the steps in a workflow. Layout of steps component is optimized for responsive design."
        [docs]="docs"
        [apiDocs]="['Steps', 'MenuItem']"
        themeDocs="steps"
    ></app-doc>`,
    standalone: true,
    imports: [AppDoc],
    styleUrl: './stepsdemo.scss'
})
export class StepsDemo {
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
            id: 'controlled',
            label: 'Controlled',
            component: ControlledDoc
        },
        {
            id: 'interactive',
            label: 'Interactive',
            component: InteractiveDoc
        },
        {
            id: 'routing',
            label: 'Routing',
            component: RoutingDoc
        },

        {
            id: 'accessibility',
            label: 'Accessibility',
            component: AccessibilityDoc
        }
    ];
}
