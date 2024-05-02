import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ContextMenuDocModule } from '@doc/contextmenu/contextmenudoc.module';
import { ContextMenuDemo } from './contextmenudemo';
import { ContextMenuDemoRoutingModule } from './contextmenudemo-routing.module';

@NgModule({
    imports: [CommonModule, ContextMenuDemoRoutingModule, ContextMenuDocModule],
    declarations: [ContextMenuDemo]
})
export class ContextMenuDemoModule {}
