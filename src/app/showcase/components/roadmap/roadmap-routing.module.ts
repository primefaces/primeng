import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RoadmapComponent } from './roadmap.component';

@NgModule({
    imports: [RouterModule.forChild([{ path: '', component: RoadmapComponent }])],
    exports: [RouterModule]
})
export class RoadmapRoutingModule {}
