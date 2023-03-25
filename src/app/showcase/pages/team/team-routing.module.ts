import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TeamComponent } from './team.component';

@NgModule({
    imports: [RouterModule.forChild([{ path: '', component: TeamComponent }])],
    exports: [RouterModule]
})
export class TeamRoutingModule {}
