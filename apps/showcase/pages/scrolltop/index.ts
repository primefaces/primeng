import { AccessibilityDoc } from '@/doc/scrolltop/accessibility-doc';
import { BasicDoc } from '@/doc/scrolltop/basic-doc';
import { ElementDoc } from '@/doc/scrolltop/element-doc';
import { ImportDoc } from '@/doc/scrolltop/import-doc';
import { PTComponent } from '@/doc/scrolltop/pt/PTComponent';
import { AppDoc } from '@/components/doc/app.doc';
import { Component } from '@angular/core';

@Component({
    standalone: true,
    imports: [AppDoc],
    template: ` <app-doc
        docTitle="Angular Scroll Top Component"
        header="ScrollTop"
        description="ScrollTop gets displayed after a certain scroll position and used to navigates to the top of the page quickly."
        [docs]="docs"
        [ptDocs]="ptComponent"
        [apiDocs]="['ScrollTop']"
        themeDocs="scrollTop"
    ></app-doc>`,
    styleUrls: ['./scrolltopdemo.scss']
})
export class ScrollTopDemo {
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
            id: 'element',
            label: 'Target Element',
            component: ElementDoc
        },

        {
            id: 'accessibility',
            label: 'Accessibility',
            component: AccessibilityDoc
        }
    ];
}
