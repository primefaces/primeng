import { AccessibilityDoc } from '@/doc/dataview/accessibility-doc';
import { BasicDoc } from '@/doc/dataview/basic-doc';
import { ImportDoc } from '@/doc/dataview/import-doc';
import { LayoutDoc } from '@/doc/dataview/layout-doc';
import { LoadingDoc } from '@/doc/dataview/loading-doc';
import { PaginationDoc } from '@/doc/dataview/pagination-doc';
import { SortingDoc } from '@/doc/dataview/sorting-doc';
import { PTComponent } from '@/doc/dataview/pt/PTComponent';
import { Component } from '@angular/core';
import { AppDoc } from '@/components/doc/app.doc';

@Component({
    standalone: true,
    imports: [AppDoc],
    template: `
        <app-doc
            docTitle="Angular DataView Component"
            header="DataView"
            description="DataView displays data in grid grid-cols-12 gap-4 or list layout with pagination and sorting features."
            [docs]="docs"
            [apiDocs]="['DataView']"
            [ptDocs]="ptComponent"
            themeDocs="dataview"
        ></app-doc>
    `,
    styleUrls: ['./dataviewdemo.scss']
})
export class DataViewDemo {
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
            id: 'pagination',
            label: 'Pagination',
            component: PaginationDoc
        },
        {
            id: 'sorting',
            label: 'Sorting',
            component: SortingDoc
        },
        {
            id: 'layout',
            label: 'Layout',
            component: LayoutDoc
        },
        {
            id: 'loading',
            label: 'Loading',
            component: LoadingDoc
        },
        {
            id: 'accessibility',
            label: 'Accessibility',
            component: AccessibilityDoc
        }
    ];
}
