import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TagDocModule } from '../../doc/tag/tagdoc.module';
import { TagDemo } from './tagdemo';
import { TagDemoRoutingModule } from './tagdemo-routing.module';

@NgModule({
    imports: [CommonModule, TagDemoRoutingModule, TagDocModule],
    declarations: [TagDemo]
})
export class TagDemoModule {}
