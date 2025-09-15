import { AccessibilityDoc } from '@/doc/accordion/accessibilitydoc';
import { BasicDoc } from '@/doc/accordion/basicdoc';
import { ControlledDoc } from '@/doc/accordion/controlleddoc';
import { DisabledDoc } from '@/doc/accordion/disableddoc';
import { DynamicDoc } from '@/doc/accordion/dynamicdoc';
import { ImportDoc } from '@/doc/accordion/importdoc';
import { MultipleDoc } from '@/doc/accordion/multipledoc';
import { TemplateDoc } from '@/doc/accordion/templatedoc';
import { AppDoc } from '@/components/doc/app.doc';
import { Component } from '@angular/core';
import { AppDocService } from '@/components/doc/app.doc.service';

@Component({
    template: `<app-doc
        docTitle="Angular Accordion Component"
        header="Accordion"
        description="Accordion groups a collection of contents in tabs."
        [docs]="docs"
        [apiDocs]="['Accordion', 'AccordionPanel', 'AccordionHeader']"
        themeDocs="accordion"
    ></app-doc>`,
    imports: [AppDoc],
    providers: [AppDocService],
    standalone: true
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
            id: 'accessibility',
            label: 'Accessibility',
            component: AccessibilityDoc
        }
    ];
}
