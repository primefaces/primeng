import { Component } from '@angular/core';
import { StyleDoc } from '../../doc/dataview/styledoc';
import { BasicDoc } from '../../doc/dataview/basicdoc';
import { ImportDoc } from '../../doc/dataview/importdoc';
import { LayoutDoc } from '../../doc/dataview/layoutdoc';
import { PaginationDoc } from '../../doc/dataview/paginationdoc';
import { PrimeflexDoc } from '../../doc/dataview/primeflexdoc';
import { SortingDoc } from '../../doc/dataview/sortingdoc';
import { PropsDoc } from '../../doc/dataview/propsdoc';
import { EventsDoc } from '../../doc/dataview/eventsdoc';
import { TemplatesDoc } from '../../doc/dataview/templatesdoc';
import { AccessibilityDoc } from '../../doc/dataview/accessibilitydoc';

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
            id: 'primeflex',
            label: 'PrimeFlex',
            component: PrimeflexDoc
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

    apiDocs = [
        {
            id: 'properties',
            label: 'Properties',
            component: PropsDoc
        },
        {
            id: 'events',
            label: 'Events',
            component: EventsDoc
        },
        {
            id: 'templates',
            label: 'Templates',
            component: TemplatesDoc
        }
    ];
}
