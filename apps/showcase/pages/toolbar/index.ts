import { BasicDoc } from '@/doc/toolbar/basicdoc';
import { ImportDoc } from '@/doc/toolbar/importdoc';
import { Component } from '@angular/core';
import { AccessibilityDoc } from '@/doc/toolbar/accessibilitydoc';
import { CustomDoc } from '@/doc/toolbar/customdoc';
import { PTComponent } from '@/doc/toolbar/pt/PTComponent';
import { AppDoc } from '@/components/doc/app.doc';

@Component({
    template: `<app-doc docTitle="Angular Toolbar Component" header="Toolbar" description="Toolbar is a grouping component for buttons and other content." [docs]="docs" [apiDocs]="['Toolbar']" [ptDocs]="ptComponent" themeDocs="toolbar"></app-doc>`,
    standalone: true,
    imports: [AppDoc]
})
export class ToolbarDemo {
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
            id: 'custom',
            label: 'Custom',
            component: CustomDoc
        },
        {
            id: 'accessibility',
            label: 'Accessibility',
            component: AccessibilityDoc
        }
    ];
}
