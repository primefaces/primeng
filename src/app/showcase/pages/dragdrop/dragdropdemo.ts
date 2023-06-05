import { Component } from '@angular/core';
import { ImportDoc } from '../../doc/dragdrop/importdoc';
import { BasicDoc } from '../../doc/dragdrop/basicdoc';
import { DataTableDoc } from '../../doc/dragdrop/datatabledoc';
import { DropIndicatorDoc } from '../../doc/dragdrop/dropindicatordoc';
import { DragHandleDoc } from '../../doc/dragdrop/draghandledoc';
import { DraggablePropsDoc } from '../../doc/dragdrop/draggablepropsdoc';
import { DraggableEventsDoc } from '../../doc/dragdrop/draggableeventsdoc';
import { DroppablePropsDoc } from '../../doc/dragdrop/droppablepropsdoc';
import { DroppableEventsDoc } from '../../doc/dragdrop/droppableeventsdoc';

@Component({
    templateUrl: './dragdropdemo.html',
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

    apiDocs = [
        {
            id: 'draggableprops',
            label: 'Properties of Draggable',
            component: DraggablePropsDoc
        },
        {
            id: 'draggableevents',
            label: 'Events of Draggable',
            component: DraggableEventsDoc
        },
        {
            id: 'droppableprops',
            label: 'Properties of Droppable',
            component: DroppablePropsDoc
        },
        {
            id: 'droppableevents',
            label: 'Events of Droppable',
            component: DroppableEventsDoc
        }
    ];
}
