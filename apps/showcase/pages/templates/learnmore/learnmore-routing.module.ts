import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LearnMoreComponent } from './learnmore.component';

@NgModule({
    imports: [RouterModule.forChild([{ path: '', pathMatch: 'full', component: LearnMoreComponent }])],
    exports: [RouterModule]
})
export class LearnMoreRoutingModule {}
