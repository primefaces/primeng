import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppDocModule } from '../../layout/doc/app.doc.module';
import { AppCodeModule } from '../../layout/doc/code/app.code.component';
import { ImportDoc } from './importdoc';
import { DragDropDataTableDemo } from './datatabledoc';
import { DragDropModule } from 'primeng/dragdrop';
import { TableModule } from 'primeng/table';
import { DragDropBasicDemo } from './basicdoc';
import { DropIndicatorDoc } from './dropindicatordoc';
import { PanelModule } from 'primeng/panel';
import { DragDropDragHandleDemo } from './draghandledoc';
import { DraggableEventsDoc } from './draggableeventsdoc';
import { DraggablePropsDoc } from './draggablepropsdoc';
import { DroppableEventsDoc } from './droppableeventsdoc';
import { DroppablePropsDoc } from './droppablepropsdoc';

@NgModule({
    imports: [CommonModule, AppCodeModule, AppDocModule, DragDropModule, TableModule, FormsModule, PanelModule],
    declarations: [DragDropBasicDemo, DragDropDataTableDemo, ImportDoc, DropIndicatorDoc, DragDropDragHandleDemo, DraggableEventsDoc, DraggablePropsDoc, DroppableEventsDoc, DroppablePropsDoc],
    exports: [AppDocModule]
})
export class DragDropDocModule {}
