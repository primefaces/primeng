import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TimelineDocModule } from '../../doc/timeline/timelinedoc.module';
import { TimelineDemo } from './timelinedemo';
import { TimelineDemoRoutingModule } from './timelinedemo-routing.module';

@NgModule({
    imports: [CommonModule, TimelineDemoRoutingModule, TimelineDocModule],
    declarations: [TimelineDemo]
})
export class TimelineDemoModule {}
