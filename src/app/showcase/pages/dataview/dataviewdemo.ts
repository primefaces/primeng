import { Component } from '@angular/core';
import { StyleDoc } from '@doc/dataview/styledoc';
import { BasicDoc } from '@doc/dataview/basicdoc';
import { ImportDoc } from '@doc/dataview/importdoc';
import { LayoutDoc } from '@doc/dataview/layoutdoc';
import { PaginationDoc } from '@doc/dataview/paginationdoc';
import { SortingDoc } from '@doc/dataview/sortingdoc';
import { AccessibilityDoc } from '@doc/dataview/accessibilitydoc';

@Component({
    templateUrl: './dataviewdemo.html',
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
            id: 'style',
            label: 'Style',
            component: StyleDoc
        },
        {
            id: 'accessibility',
            label: 'Accessibility',
            component: AccessibilityDoc
        }
    ];
}
