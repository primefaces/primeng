import { AccessibilityDoc } from '@/doc/scrollpanel/accessibilitydoc';
import { BasicDoc } from '@/doc/scrollpanel/basicdoc';
import { CusstomDoc } from '@/doc/scrollpanel/customdoc';
import { ImportDoc } from '@/doc/scrollpanel/importdoc';
import { AppDoc } from '@/components/doc/app.doc';
import { Component } from '@angular/core';

@Component({
    template: `<app-doc
        docTitle="Angular Scroll Panel Component"
        header="ScrollPanel"
        description="ScrollPanel is a cross browser, lightweight and skinnable alternative to native browser scrollbar."
        [docs]="docs"
        [apiDocs]="['ScrollPanel']"
        themeDocs="scrollpanel"
    ></app-doc>`,
    standalone: true,
    imports: [AppDoc]
})
export class ScrollPanelDemo {
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
            component: CusstomDoc
        },

        {
            id: 'accessibility',
            label: 'Accessibility',
            component: AccessibilityDoc
        }
    ];
}
