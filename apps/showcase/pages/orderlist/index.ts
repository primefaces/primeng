import { AppDoc } from '@/components/doc/app.doc';
import { AccessibilityDoc } from '@/doc/orderlist/accessibilitydoc';
import { BasicDoc } from '@/doc/orderlist/basicdoc';
import { DragDropDoc } from '@/doc/orderlist/dragdropdoc';
import { FilterDoc } from '@/doc/orderlist/filterdoc';
import { ImportDoc } from '@/doc/orderlist/importdoc';
import { TemplateDoc } from '@/doc/orderlist/templatedoc';
import { PTComponent } from '@/doc/orderlist/pt/PTComponent';
import { Component } from '@angular/core';

@Component({
    template: `<app-doc docTitle="Angular OrderList Component" header="OrderList" description="OrderList is used to sort a collection." [docs]="docs" [apiDocs]="['OrderList']" [ptDocs]="ptComponent" themeDocs="orderlist"></app-doc>`,
    standalone: true,
    imports: [AppDoc]
})
export class OrderListDemo {
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
            id: 'filter',
            label: 'Filter',
            component: FilterDoc
        },
        {
            id: 'template',
            label: 'Template',
            component: TemplateDoc
        },
        {
            id: 'drag-drop',
            label: 'Drag & Drop',
            component: DragDropDoc
        },
        {
            id: 'accessibility',
            label: 'Accessibility',
            component: AccessibilityDoc
        }
    ];
}
