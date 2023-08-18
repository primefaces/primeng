import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SkeletonDemo } from './skeletondemo';

@NgModule({
    imports: [RouterModule.forChild([{ path: '', component: SkeletonDemo }])],
    exports: [RouterModule]
})
export class SkeletonDemoRoutingModule {}
