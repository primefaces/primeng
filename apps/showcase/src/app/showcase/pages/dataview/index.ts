import { Component } from '@angular/core';
import { BasicDoc } from '@doc/dataview/basicdoc';
import { ImportDoc } from '@doc/dataview/importdoc';
import { LayoutDoc } from '@doc/dataview/layoutdoc';
import { PaginationDoc } from '@doc/dataview/paginationdoc';
import { SortingDoc } from '@doc/dataview/sortingdoc';
import { AccessibilityDoc } from '@doc/dataview/accessibilitydoc';
import { LoadingDoc } from '@doc/dataview/loadingdoc';
import { DataViewDocModule } from '@doc/dataview/dataviewdoc.module';

@Component({
    standalone: true,
    imports: [DataViewDocModule],
    template: `
        <app-doc
            docTitle="Angular DataView Component"
            header="DataView"
            description="DataView displays data in grid grid-cols-12 gap-4 or list layout with pagination and sorting features."
            [docs]="docs"
            [apiDocs]="['DataView']"
            themeDocs="dataview"
        ></app-doc>
    `,
    styleUrls: ['./dataviewdemo.scss'],
})
export class DataViewDemo {
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
            id: 'pagination',
            label: 'Pagination',
            component: PaginationDoc,
        },
        {
            id: 'sorting',
            label: 'Sorting',
            component: SortingDoc,
        },
        {
            id: 'layout',
            label: 'Layout',
            component: LayoutDoc,
        },
        {
            id: 'loading',
            label: 'Loading',
            component: LoadingDoc,
        },

        {
            id: 'accessibility',
            label: 'Accessibility',
            component: AccessibilityDoc,
        },
    ];
}
