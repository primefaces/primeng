import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TabMenuDocModule } from '@doc/tabmenu/tabmenudoc.module';
import { TabMenuDemo } from './tabmenudemo';
import { TabMenuDemoRoutingModule } from './tabmenudemo-routing.module';

@NgModule({
    imports: [CommonModule, TabMenuDemoRoutingModule, TabMenuDocModule],
    declarations: [TabMenuDemo]
})
export class TabMenuDemoModule {}
