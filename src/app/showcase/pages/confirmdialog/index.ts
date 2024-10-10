import { Component } from '@angular/core';
import { BasicDoc } from '@doc/confirmdialog/basicdoc';
import { ImportDoc } from '@doc/confirmdialog/importdoc';
import { PositionDoc } from '@doc/confirmdialog/positiondoc';
import { TemplateDoc } from '@doc/confirmdialog/templatedoc';
import { HeadlessDoc } from '@doc/confirmdialog/headlessdoc';
import { AccessibilityDoc } from '@doc/confirmdialog/accessibilitydoc';
import { ConfirmDialogDocModule } from '@doc/confirmdialog/confirmdialogdoc.module';

@Component({
    standalone: true,
    imports: [ConfirmDialogDocModule],
    template: `
        <app-doc
            docTitle="Angular ConfirmDialog Component"
            header="ConfirmDialog"
            description="ConfirmDialog is backed by a service utilizing Observables to display confirmation windows easily that can be shared by multiple actions on the same component."
            [docs]="docs"
            [apiDocs]="['ConfirmDialog', 'ConfirmationService', 'Confirmation']"
            themeDocs="confirmDialog"
        ></app-doc>
    `,
})
export class ConfirmDialogDemo {
    docs = [
        {
            id: 'import',
            label: 'Import',
            component: ImportDoc,
        },
        {
            id: 'basic',
            label: 'Basic',
            component: BasicDoc,
        },
        {
            id: 'position',
            label: 'Position',
            component: PositionDoc,
        },
        {
            id: 'template',
            label: 'Template',
            component: TemplateDoc,
        },
        {
            id: 'headless',
            label: 'Headless',
            component: HeadlessDoc,
        },
        {
            id: 'accessibility',
            label: 'Accessibility',
            component: AccessibilityDoc,
        },
    ];
}
