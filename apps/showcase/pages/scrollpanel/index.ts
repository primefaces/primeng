import { AppDoc } from '@/components/doc/app.doc';
import { AccessibilityDoc } from '@/doc/scrollpanel/accessibility-doc';
import { BasicDoc } from '@/doc/scrollpanel/basic-doc';
import { CusstomDoc } from '@/doc/scrollpanel/custom-doc';
import { ImportDoc } from '@/doc/scrollpanel/import-doc';
import { PTComponent } from '@/doc/scrollpanel/pt/PTComponent';
import { Component } from '@angular/core';

@Component({
    template: `<app-doc
        docTitle="Angular Scroll Panel Component"
        header="ScrollPanel"
        description="ScrollPanel is a cross browser, lightweight and skinnable alternative to native browser scrollbar."
        [docs]="docs"
        [apiDocs]="['ScrollPanel']"
        themeDocs="scrollpanel"
        [ptDocs]="ptComponent"
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

    ptComponent = PTComponent;
}
