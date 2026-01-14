import { AccessibilityDoc } from '@/doc/confirmdialog/accessibility-doc';
import { BasicDoc } from '@/doc/confirmdialog/basic-doc';
import { HeadlessDoc } from '@/doc/confirmdialog/headless-doc';
import { ImportDoc } from '@/doc/confirmdialog/import-doc';
import { PositionDoc } from '@/doc/confirmdialog/position-doc';
import { PTComponent } from '@/doc/confirmdialog/pt/PTComponent';
import { TemplateDoc } from '@/doc/confirmdialog/template-doc';
import { Component } from '@angular/core';
import { AppDoc } from '@/components/doc/app.doc';
@Component({
    standalone: true,
    imports: [AppDoc],
    template: `
        <app-doc
            docTitle="Angular ConfirmDialog Component"
            header="ConfirmDialog"
            description="ConfirmDialog is backed by a service utilizing Observables to display confirmation windows easily that can be shared by multiple actions on the same component."
            [docs]="docs"
            [apiDocs]="['ConfirmDialog', 'ConfirmationService', 'Confirmation']"
            [ptDocs]="ptComponent"
            themeDocs="confirmDialog"
        ></app-doc>
    `
})
export class ConfirmDialogDemo {
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
            id: 'position',
            label: 'Position',
            component: PositionDoc
        },
        {
            id: 'template',
            label: 'Template',
            component: TemplateDoc
        },
        {
            id: 'headless',
            label: 'Headless',
            component: HeadlessDoc
        },
        {
            id: 'accessibility',
            label: 'Accessibility',
            component: AccessibilityDoc
        }
    ];
}
