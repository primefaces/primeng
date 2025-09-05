import { BasicDoc } from '@/doc/dragdrop/basicdoc';
import { DataTableDoc } from '@/doc/dragdrop/datatabledoc';
import { DragHandleDoc } from '@/doc/dragdrop/draghandledoc';
import { DropIndicatorDoc } from '@/doc/dragdrop/dropindicatordoc';
import { ImportDoc } from '@/doc/dragdrop/importdoc';
import { Component } from '@angular/core';
import { AppDoc } from '@/components/doc/app.doc';

@Component({
    standalone: true,
    imports: [AppDoc],
    template: ` <app-doc docTitle="Angular Drag and Drop Component" header="Drag and Drop" description="pDraggable and pDroppable directives apply drag-drop behaviors to any element." [docs]="docs" [apiDocs]="['DragDrop']"></app-doc>`,
    styleUrls: ['./dragdropdemo.scss']
})
export class DragDropDemo {
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
            id: 'datatable',
            label: 'DataTable',
            component: DataTableDoc
        },
        {
            id: 'dropindicator',
            label: 'Drop Indicator',
            component: DropIndicatorDoc
        },
        {
            id: 'draghandle',
            label: 'Drag Handle',
            component: DragHandleDoc
        }
    ];
}
