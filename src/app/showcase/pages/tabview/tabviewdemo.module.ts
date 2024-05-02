import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TabViewDocModule } from '@doc/tabview/tabviewdoc.module';
import { TabViewDemo } from './tabviewdemo';
import { TabViewDemoRoutingModule } from './tabviewdemo-routing.module';

@NgModule({
    imports: [CommonModule, TabViewDemoRoutingModule, TabViewDocModule],
    declarations: [TabViewDemo]
})
export class TabViewDemoModule {}
