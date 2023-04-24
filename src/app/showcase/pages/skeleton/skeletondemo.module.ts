import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SkeletonDocModule } from '../../doc/skeleton/skeletondoc.module';
import { AppDocModule } from '../../layout/doc/app.doc.module';
import { SkeletonDemo } from './skeletondemo';
import { SkeletonDemoRoutingModule } from './skeletondemo-routing.module';

@NgModule({
    imports: [CommonModule, SkeletonDemoRoutingModule, AppDocModule, SkeletonDocModule],
    declarations: [SkeletonDemo]
})
export class SkeletonDemoModule {}
