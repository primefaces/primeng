import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DragDropDocModule } from '@doc/dragdrop/dragdropdoc.module';
import { DragDropDemo } from './dragdropdemo';
import { DragDropDemoRoutingModule } from './dragdropdemo-routing.module';

@NgModule({
    imports: [CommonModule, DragDropDemoRoutingModule, DragDropDocModule],
    declarations: [DragDropDemo]
})
export class DragDropDemoModule {}
