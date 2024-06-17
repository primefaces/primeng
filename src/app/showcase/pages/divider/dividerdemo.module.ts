import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DividerDocModule } from '@doc/divider/dividerdoc.module';
import { DividerDemo } from './dividerdemo';
import { TagDemoRoutingModule } from './dividerdemo-routing.module';

@NgModule({
    imports: [CommonModule, TagDemoRoutingModule, DividerDocModule],
    declarations: [DividerDemo]
})
export class DividerDemoModule {}
