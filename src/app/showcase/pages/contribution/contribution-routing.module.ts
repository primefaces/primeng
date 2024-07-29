import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ContributionComponent } from './contribution';


@NgModule({
    imports: [RouterModule.forChild([{ path: '', component: ContributionComponent }])],
    exports: [RouterModule]
})
export class ContributionRoutingModule {}
