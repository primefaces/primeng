import { AppDoc } from '@/components/doc/app.doc';
import { AccessibilityDoc } from '@/doc/stepper/accessibility-doc';
import { BasicDoc } from '@/doc/stepper/basic-doc';
import { ImportDoc } from '@/doc/stepper/import-doc';
import { LinearDoc } from '@/doc/stepper/linear-doc';
import { PTComponent } from '@/doc/stepper/pt/PTComponent';
import { StepsOnlyDoc } from '@/doc/stepper/stepsonly';
import { TemplateDoc } from '@/doc/stepper/template-doc';
import { VerticalDoc } from '@/doc/stepper/vertical-doc';
import { Component } from '@angular/core';

@Component({
    template: `<app-doc
        docTitle="Angular Stepper Component"
        header="Stepper"
        description="The Stepper component displays a wizard-like workflow by guiding users through the multi-step progression."
        [docs]="docs"
        [apiDocs]="['Stepper']"
        themeDocs="stepper"
        [ptDocs]="ptComponent"
    ></app-doc>`,
    standalone: true,
    imports: [AppDoc]
})
export class StepperDemo {
    docs = [
        {
            id: 'import',
            label: 'Import',
            component: ImportDoc
        },
        {
            id: 'horizontal',
            label: 'Horizontal',
            component: BasicDoc
        },
        {
            id: 'vertical',
            label: 'Vertical',
            component: VerticalDoc
        },
        {
            id: 'linear',
            label: 'Linear',
            component: LinearDoc
        },
        {
            id: 'steps-only',
            label: 'Steps Only',
            component: StepsOnlyDoc
        },
        {
            id: 'template',
            label: 'Template',
            component: TemplateDoc
        },
        {
            id: 'accessibility',
            label: 'Accessibility',
            component: AccessibilityDoc
        }
    ];

    ptComponent = PTComponent;
}
