import { Component } from '@angular/core';
import { FilterDoc } from '@doc/orderlist/filterdoc';
import { BasicDoc } from '@doc/orderlist/basicdoc';
import { ImportDoc } from '@doc/orderlist/importdoc';
import { DragDropDoc } from '@doc/orderlist/dragdropdoc';
import { AccessibilityDoc } from '@doc/orderlist/accessibilitydoc';
import { OrderlistDocModule } from '@doc/orderlist/orderlistdoc.module';
import { TemplateDoc } from '@doc/orderlist/templatedoc';

@Component({
    template: `<app-doc
        docTitle="Angular OrderList Component"
        header="OrderList"
        description="OrderList is used to sort a collection."
        [docs]="docs"
        [apiDocs]="['OrderList']"
        themeDocs="orderlist"
    ></app-doc>`,
    standalone: true,
    imports: [OrderlistDocModule],
    styleUrl: './orderlistdemo.scss',
})
export class OrderListDemo {
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
            id: 'filter',
            label: 'Filter',
            component: FilterDoc,
        },
        {
            id: 'dragdrop',
            label: 'DragDrop',
            component: DragDropDoc,
        },
        {
            id: 'template',
            label: 'Template',
            component: TemplateDoc,
        },
        {
            id: 'accessibility',
            label: 'Accessibility',
            component: AccessibilityDoc,
        },
    ];
}
