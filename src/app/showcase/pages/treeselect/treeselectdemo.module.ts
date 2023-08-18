import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TreeSelectDocModule } from '../../doc/treeselect/treeselectdoc.module';
import { TreeSelectDemo } from './treeselectdemo';
import { TreeSelectDemoRoutingModule } from './treeselectdemo-routing.module';

@NgModule({
    imports: [CommonModule, TreeSelectDemoRoutingModule, TreeSelectDocModule],
    declarations: [TreeSelectDemo]
})
export class TreeSelectDemoModule {}
