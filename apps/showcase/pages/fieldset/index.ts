import { AppDoc } from '@/components/doc/app.doc';
import { AccessibilityDoc } from '@/doc/fieldset/accessibility-doc';
import { BasicDoc } from '@/doc/fieldset/basic-doc';
import { UsageDoc } from '@/doc/fieldset/usage-doc';
import { PTComponent } from '@/doc/fieldset/pt/PTComponent';
import { TemplateDoc } from '@/doc/fieldset/template-doc';
import { ToggleableDoc } from '@/doc/fieldset/toggleable-doc';
import { Component } from '@angular/core';

@Component({
    standalone: true,
    imports: [AppDoc],
    template: `
        <app-doc
            docTitle="Angular Fieldset Component"
            header="Fieldset"
            description="Fieldset is a grouping component with a content toggle feature."
            [docs]="docs"
            [apiDocs]="['Fieldset']"
            themeDocs="fieldset"
            [ptDocs]="ptComponent"
            [heroDoc]="heroDoc"
        ></app-doc>
    `
})
export class FieldsetDemo {
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
                {
                    id: 'basic',
                    label: 'Basic',
                    component: BasicDoc
                },
                {
                    id: 'toggleable',
                    label: 'Toggleable',
                    component: ToggleableDoc
                },
                {
                    id: 'template',
                    label: 'Template',
                    component: TemplateDoc
                }
            ]
        },
        {
            id: 'accessibility',
            label: 'Accessibility',
            component: AccessibilityDoc
        }
    ];

    ptComponent = PTComponent;
}
