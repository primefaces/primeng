import { Component } from '@angular/core';
import { FilterDoc } from '../../doc/orderlist/filterdoc';
import { BasicDoc } from '../../doc/orderlist/basicdoc';
import { ImportDoc } from '../../doc/orderlist/importdoc';
import { DragDropDoc } from '../../doc/orderlist/dragdropdoc';
import { StyleDoc } from '../../doc/orderlist/styledoc';
import { PropsDoc } from '../../doc/orderlist/propsdoc';
import { EventsDoc } from '../../doc/orderlist/eventsdoc';
import { MethodsDoc } from '../../doc/orderlist/methodsdoc';
import { TemplatesDoc } from '../../doc/orderlist/templatesdoc';
import { AccessibilityDoc } from '../../doc/orderlist/accessibilitydoc';

@Component({
    templateUrl: './orderlistdemo.html',
    styleUrls: ['./orderlistdemo.scss']
})
export class OrderListDemo {
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
            id: 'filter',
            label: 'Filter',
            component: FilterDoc
        },
        {
            id: 'dragdrop',
            label: 'DragDrop',
            component: DragDropDoc
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
        },
        {
            id: 'methods',
            label: 'Methods',
            component: MethodsDoc
        }
    ];
}
