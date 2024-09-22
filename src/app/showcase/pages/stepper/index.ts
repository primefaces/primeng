import { Component } from '@angular/core';
import { ImportDoc } from '@doc/stepper/importdoc';
import { BasicDoc } from '@doc/stepper/basicdoc';
import { VerticalDoc } from '@doc/stepper/verticaldoc';
import { LinearDoc } from '@doc/stepper/lineardoc';
import { TemplateDoc } from '@doc/stepper/templatedoc';
import { AccessibilityDoc } from '@doc/stepper/accessibilitydoc';
import { StepperDocModule } from '@doc/stepper/stepperdoc.module';

@Component({
    template: `<app-doc
        docTitle="Angular Stepper Component"
        header="Stepper"
        description="The Stepper component displays a wizard-like workflow by guiding users through the multi-step progression."
        [docs]="docs"
        [apiDocs]="['Stepper', 'StepperPanel']"
        themeDocs="stepper"
    ></app-doc>`,
    standalone: true,
    imports: [StepperDocModule],
})
export class StepperDemo {
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
            id: 'vertical',
            label: 'Vertical',
            component: VerticalDoc,
        },
        {
            id: 'linear',
            label: 'Linear',
            component: LinearDoc,
        },
        {
            id: 'template',
            label: 'Template',
            component: TemplateDoc,
        },
        {
            id: 'accessibility',
            label: 'Accessibility',
            component: AccessibilityDoc,
        },
    ];
}
