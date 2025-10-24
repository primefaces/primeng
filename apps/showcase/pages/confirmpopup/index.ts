import { AccessibilityDoc } from '@/doc/confirmpopup/accessibilitydoc';
import { BasicDoc } from '@/doc/confirmpopup/basicdoc';
import { HeadlessDoc } from '@/doc/confirmpopup/headlessdoc';
import { ImportDoc } from '@/doc/confirmpopup/importdoc';
import { PTComponent } from '@/doc/confirmpopup/pt/PTComponent';
import { TemplateDoc } from '@/doc/confirmpopup/templatedoc';
import { Component } from '@angular/core';
import { AppDoc } from '@/components/doc/app.doc';

@Component({
    standalone: true,
    imports: [AppDoc],
    template: `
        <app-doc
            docTitle="Angular ConfirmPopup Component"
            header="ConfirmPopup"
            description="ConfirmPopup displays a confirmation overlay displayed relatively to its target."
            [docs]="docs"
            [apiDocs]="['ConfirmPopup', 'Confirmation', 'ConfirmationService']"
            [ptDocs]="ptComponent"
            themeDocs="confirmPopup"
        ></app-doc>
    `
})
export class ConfirmPopupDemo {
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
