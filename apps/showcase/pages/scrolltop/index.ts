import { AccessibilityDoc } from '@/doc/scrolltop/accessibilitydoc';
import { BasicDoc } from '@/doc/scrolltop/basicdoc';
import { ElementDoc } from '@/doc/scrolltop/elementdoc';
import { ImportDoc } from '@/doc/scrolltop/importdoc';
import { ScrollTopDocModule } from '@/doc/scrolltop/scrolltopdoc.module';
import { Component } from '@angular/core';

@Component({
    standalone: true,
    imports: [ScrollTopDocModule],
    template: ` <app-doc
        docTitle="Angular Scroll Top Component"
        header="ScrollTop"
        description="ScrollTop gets displayed after a certain scroll position and used to navigates to the top of the page quickly."
        [docs]="docs"
        [apiDocs]="['ScrollTop']"
        themeDocs="scrollTop"
    ></app-doc>`,
    styleUrls: ['./scrolltopdemo.scss']
})
export class ScrollTopDemo {
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
