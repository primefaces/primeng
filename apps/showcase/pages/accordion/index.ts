import { AccessibilityDoc } from '@/doc/accordion/accessibility-doc';
import { BasicDoc } from '@/doc/accordion/basic-doc';
import { ControlledDoc } from '@/doc/accordion/controlled-doc';
import { DisabledDoc } from '@/doc/accordion/disabled-doc';
import { DynamicDoc } from '@/doc/accordion/dynamic-doc';
import { ImportDoc } from '@/doc/accordion/import-doc';
import { MultipleDoc } from '@/doc/accordion/multiple-doc';
import { TemplateDoc } from '@/doc/accordion/template-doc';
import { PTComponent } from '@/doc/accordion/pt/PTComponent';
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
        [ptDocs]="ptComponent"
        themeDocs="accordion"
    ></app-doc>`,
    imports: [AppDoc],
    providers: [AppDocService],
    standalone: true
})
export class AccordionDemo {
    ptComponent = PTComponent;
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
