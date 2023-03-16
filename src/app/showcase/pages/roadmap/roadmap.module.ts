import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RoadmapRoutingModule } from './roadmap-routing.module';
import { RoadmapComponent } from './roadmap.component';

@NgModule({
    imports: [CommonModule, RoadmapRoutingModule],
    declarations: [RoadmapComponent]
})
export class RoadmapModule {}
