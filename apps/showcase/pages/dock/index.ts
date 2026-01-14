import { AccessibilityDoc } from '@/doc/dock/accessibility-doc';
import { AdvancedDoc } from '@/doc/dock/advanced-doc';
import { BasicDoc } from '@/doc/dock/basic-doc';
import { ImportDoc } from '@/doc/dock/import-doc';
import { PTComponent } from '@/doc/dock/pt/PTComponent';
import { Component } from '@angular/core';
import { AppDoc } from '@/components/doc/app.doc';

@Component({
    standalone: true,
    imports: [AppDoc],
    template: ` <app-doc docTitle="Angular Dock Component" header="Dock" description="Dock is a navigation component consisting of menuitems." [docs]="docs" [apiDocs]="['Dock', 'MenuItem']" [ptDocs]="ptComponent" themeDocs="dock"></app-doc> `
})
export class DockDemo {
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
            id: 'advanced',
            label: 'Advanced',
            component: AdvancedDoc
        },
        {
            id: 'accessibility',
            label: 'Accessibility',
            component: AccessibilityDoc
        }
    ];

    ptComponent = PTComponent;
}
