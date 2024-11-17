import { AccessibilityDoc } from '@/doc/fieldset/accessibilitydoc';
import { BasicDoc } from '@/doc/fieldset/basicdoc';
import { FieldsetDocModule } from '@/doc/fieldset/fieldsetdoc.module';
import { ImportDoc } from '@/doc/fieldset/importdoc';
import { TemplateDoc } from '@/doc/fieldset/templatedoc';
import { ToggleableDoc } from '@/doc/fieldset/toggleabledoc';
import { Component } from '@angular/core';

@Component({
    standalone: true,
    imports: [FieldsetDocModule],
    template: ` <app-doc docTitle="Angular Fieldset Component" header="Fieldset" description="Fieldset is a grouping component with a content toggle feature." [docs]="docs" [apiDocs]="['Fieldset']" themeDocs="fieldset"></app-doc> `
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
}
