import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TreeDocModule } from '@doc/tree/treedoc.module';
import { TreeDemo } from './treedemo';
import { TreeDemoRoutingModule } from './treedemo-routing.module';

@NgModule({
    imports: [CommonModule, TreeDemoRoutingModule, TreeDocModule],
    declarations: [TreeDemo]
})
export class TreeDemoModule {}
