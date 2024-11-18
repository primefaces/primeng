import { AccessibilityDoc } from '@/doc/dataview/accessibilitydoc';
import { BasicDoc } from '@/doc/dataview/basicdoc';
import { DataViewDocModule } from '@/doc/dataview/dataviewdoc.module';
import { ImportDoc } from '@/doc/dataview/importdoc';
import { LayoutDoc } from '@/doc/dataview/layoutdoc';
import { LoadingDoc } from '@/doc/dataview/loadingdoc';
import { PaginationDoc } from '@/doc/dataview/paginationdoc';
import { SortingDoc } from '@/doc/dataview/sortingdoc';
import { Component } from '@angular/core';

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
    styleUrls: ['./dataviewdemo.scss']
})
export class DataViewDemo {
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
