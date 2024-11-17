import { AccessibilityDoc } from '@/doc/steps/accessibilitydoc';
import { BasicDoc } from '@/doc/steps/basicdoc';
import { ControlledDoc } from '@/doc/steps/controlleddoc';
import { ImportDoc } from '@/doc/steps/importdoc';
import { InteractiveDoc } from '@/doc/steps/interactivedoc';
import { RoutingDoc } from '@/doc/steps/routingdoc';
import { StepsDocModule } from '@/doc/steps/stepsdoc.module';
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
    imports: [StepsDocModule],
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
