import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SortSingleColumnDoc } from '@doc/treetable/sortsinglecolumndoc';
import { TreeTableDocModule } from '@doc/treetable/treetabledoc.module';
import { TreeTableDemo } from './treetabledemo';
import { TreeTableDemoRoutingModule } from './treetabledemo-routing.module';

@NgModule({
    imports: [CommonModule, TreeTableDemoRoutingModule, TreeTableDocModule],
    declarations: [TreeTableDemo]
})
export class TreeTableDemoModule {}
