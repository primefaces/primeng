import { AccessibilityDoc } from '@/doc/confirmpopup/accessibilitydoc';
import { BasicDoc } from '@/doc/confirmpopup/basicdoc';
import { ConfirmPopupDocModule } from '@/doc/confirmpopup/confirmpopupdoc.module';
import { HeadlessDoc } from '@/doc/confirmpopup/headlessdoc';
import { ImportDoc } from '@/doc/confirmpopup/importdoc';
import { TemplateDoc } from '@/doc/confirmpopup/templatedoc';
import { Component } from '@angular/core';

@Component({
    standalone: true,
    imports: [ConfirmPopupDocModule],
    template: `
        <app-doc
            docTitle="Angular ConfirmPopup Component"
            header="ConfirmPopup"
            description="ConfirmPopup displays a confirmation overlay displayed relatively to its target."
            [docs]="docs"
            [apiDocs]="['ConfirmPopup', 'Confirmation', 'ConfirmationService']"
            themeDocs="confirmPopup"
        ></app-doc>
    `
})
export class ConfirmPopupDemo {
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
