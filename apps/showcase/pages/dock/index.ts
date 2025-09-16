import { AccessibilityDoc } from '@/doc/dock/accessibilitydoc';
import { AdvancedDoc } from '@/doc/dock/advanceddoc';
import { BasicDoc } from '@/doc/dock/basicdoc';
import { ImportDoc } from '@/doc/dock/importdoc';
import { Component } from '@angular/core';
import { AppDoc } from '@/components/doc/app.doc';

@Component({
    standalone: true,
    imports: [AppDoc],
    template: ` <app-doc docTitle="Angular Dock Component" header="Dock" description="Dock is a navigation component consisting of menuitems." [docs]="docs" [apiDocs]="['Dock', 'MenuItem']" themeDocs="dock"></app-doc> `
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
}
