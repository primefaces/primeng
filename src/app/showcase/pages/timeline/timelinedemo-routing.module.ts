import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TimelineDemo } from './timelinedemo';

@NgModule({
    imports: [RouterModule.forChild([{ path: '', component: TimelineDemo }])],
    exports: [RouterModule]
})
export class TimelineDemoRoutingModule {}
