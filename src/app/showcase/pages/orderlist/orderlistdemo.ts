import { Component } from '@angular/core';
import { FilterDoc } from '../../doc/orderlist/filterdoc';
import { BasicDoc } from '../../doc/orderlist/basicdoc';
import { ImportDoc } from '../../doc/orderlist/importdoc';
import { DragDropDoc } from '../../doc/orderlist/dragdropdoc';
import { StyleDoc } from '../../doc/orderlist/styledoc';
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
}
