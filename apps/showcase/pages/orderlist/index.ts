import { AppDoc } from '@/components/doc/app.doc';
import { AccessibilityDoc } from '@/doc/orderlist/accessibility-doc';
import { BasicDoc } from '@/doc/orderlist/basic-doc';
import { DragDropDoc } from '@/doc/orderlist/dragdrop-doc';
import { FilterDoc } from '@/doc/orderlist/filter-doc';
import { ImportDoc } from '@/doc/orderlist/import-doc';
import { TemplateDoc } from '@/doc/orderlist/template-doc';
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
