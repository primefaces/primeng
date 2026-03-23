import { AppDoc } from '@/components/doc/app.doc';
import { AccessibilityDoc } from '@/doc/panel/accessibility-doc';
import { BasicDoc } from '@/doc/panel/basic-doc';
import { ImportDoc } from '@/doc/panel/import-doc';
import { PTComponent } from '@/doc/panel/pt/PTComponent';
import { TemplateDoc } from '@/doc/panel/template-doc';
import { ToggleableDoc } from '@/doc/panel/toggleable-doc';
import { Component } from '@angular/core';
@Component({
    template: ` <app-doc docTitle="Angular Panel Component" header="Panel" description="Panel is a container component with an optional content toggle feature." [docs]="docs" [apiDocs]="['Panel']" themeDocs="panel" [ptDocs]="ptComponent"></app-doc>`,
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

    ptComponent = PTComponent;
}
