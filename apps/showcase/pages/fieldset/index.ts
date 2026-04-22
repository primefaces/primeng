import { AppDoc } from '@/components/doc/app.doc';
import { AccessibilityDoc } from '@/doc/fieldset/accessibility-doc';
import { BasicDoc } from '@/doc/fieldset/basic-doc';
import { ImportDoc } from '@/doc/fieldset/import-doc';
import { PTComponent } from '@/doc/fieldset/pt/PTComponent';
import { TemplateDoc } from '@/doc/fieldset/template-doc';
import { ToggleableDoc } from '@/doc/fieldset/toggleable-doc';
import { Component } from '@angular/core';

@Component({
    standalone: true,
    imports: [AppDoc],
    template: `
        <app-doc docTitle="Angular Fieldset Component" header="Fieldset" description="Fieldset is a grouping component with a content toggle feature." [docs]="docs" [apiDocs]="['Fieldset']" themeDocs="fieldset" [ptDocs]="ptComponent"></app-doc>
    `
})
export class FieldsetDemo {
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
            id: 'toggleable',
            label: 'Toggleable',
            component: ToggleableDoc
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
