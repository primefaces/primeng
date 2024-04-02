import { Component } from '@angular/core';
import { AccessibilityDoc } from '@docaccordion/accessibilitydoc';
import { BasicDoc } from '@docaccordion/basicdoc';
import { ControlledDoc } from '@docaccordion/controlleddoc';
import { DisabledDoc } from '@docaccordion/disableddoc';
import { ImportDoc } from '@docaccordion/importdoc';
import { MultipleDoc } from '@docaccordion/multipledoc';
import { StyleDoc } from '@docaccordion/styledoc';
import { TemplateDoc } from '@docaccordion/templatedoc';
import { AccordionDocModule } from '@docaccordion/accordiondoc.module';

@Component({
    template: `<app-doc docTitle="Angular Accordion Component" header="Accordion" description="Accordion groups a collection of contents in tabs." [docs]="docs" [apiDocs]="['Accordion', 'AccordionTab']"></app-doc>`,
    imports: [AccordionDocModule],
    standalone: true,
    styles: `:host ::ng-deep .p-accordion p {
        line-height: 1.5;
        margin: 0;
    }`
})
export class AccordionDemo {
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
            id: 'multiple',
            label: 'Multiple',
            component: MultipleDoc
        },
        {
            id: 'disabled',
            label: 'Disabled',
            component: DisabledDoc
        },
        {
            id: 'controlled',
            label: 'Controlled',
            component: ControlledDoc
        },
        {
            id: 'template',
            label: 'Template',
            component: TemplateDoc
        },
        {
            id: 'style',
            label: 'Style',
            component: StyleDoc
        },
        {
            id: 'accessibility',
            label: 'Accessibility',
            component: AccessibilityDoc
        }
    ];
}
