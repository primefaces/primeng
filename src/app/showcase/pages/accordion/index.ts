import { Component } from '@angular/core';
import { AccessibilityDoc } from '@doc/accordion/accessibilitydoc';
import { BasicDoc } from '@doc/accordion/basicdoc';
import { ControlledDoc } from '@doc/accordion/controlleddoc';
import { DisabledDoc } from '@doc/accordion/disableddoc';
import { ImportDoc } from '@doc/accordion/importdoc';
import { MultipleDoc } from '@doc/accordion/multipledoc';
import { StyleDoc } from '@doc/accordion/styledoc';
import { TemplateDoc } from '@doc/accordion/templatedoc';
import { AccordionDocModule } from '@doc/accordion/accordiondoc.module';
import { DynamicDoc } from '@doc/accordion/dynamicdoc';

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
            id: 'dynamic',
            label: 'Dynamic',
            component: DynamicDoc
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
