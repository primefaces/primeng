import { AccessibilityDoc } from '@/doc/panel/accessibilitydoc';
import { BasicDoc } from '@/doc/panel/basicdoc';
import { ImportDoc } from '@/doc/panel/importdoc';
import { TemplateDoc } from '@/doc/panel/templatedoc';
import { ToggleableDoc } from '@/doc/panel/toggleabledoc';
import { Component } from '@angular/core';
import { AppDoc } from '@/components/doc/app.doc';

@Component({
    template: `<app-doc docTitle="Angular Panel Component" header="Panel" description="Panel is a container component with an optional content toggle feature." [docs]="docs" [apiDocs]="['Panel']" themeDocs="panel"></app-doc>`,
    standalone: true,
    imports: [AppDoc]
})
export class PanelDemo {
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
