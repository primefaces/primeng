import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TemplatesComponent } from './templates.component';
import { LearnMoreComponent } from './learnmore/learnmore.component';

@NgModule({
    imports: [RouterModule.forChild([{ path: '', pathMatch: 'full', component: TemplatesComponent },  { path: ':id', component: LearnMoreComponent}])],
    exports: [RouterModule]
})
export class TemplatesRoutingModule {}
