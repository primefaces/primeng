import { BasicDoc } from '@/doc/dragdrop/basic-doc';
import { DataTableDoc } from '@/doc/dragdrop/datatable-doc';
import { DragHandleDoc } from '@/doc/dragdrop/draghandle-doc';
import { DropIndicatorDoc } from '@/doc/dragdrop/dropindicator-doc';
import { UsageDoc } from '@/doc/dragdrop/usage-doc';
import { Component } from '@angular/core';
import { AppDoc } from '@/components/doc/app.doc';

@Component({
    standalone: true,
    imports: [AppDoc],
    template: ` <app-doc
        docTitle="Angular Drag and Drop Component"
        header="Drag and Drop"
        description="pDraggable and pDroppable directives apply drag-drop behaviors to any element."
        [docs]="docs"
        [heroDoc]="heroDoc"
        [apiDocs]="['DragDrop']"
    ></app-doc>`,
    styleUrls: ['./dragdropdemo.scss']
})
export class DragDropDemo {
    heroDoc = BasicDoc;

    docs = [
        {
            id: 'usage',
            label: 'Usage',
            component: UsageDoc
        },
        {
            id: 'examples',
            label: 'Examples',
            children: [
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
            ]
        }
    ];
}
