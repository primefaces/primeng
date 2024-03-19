import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TemplatesComponent } from './templates.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: '', pathMatch: 'full', component: TemplatesComponent },
            { path: ':id', loadChildren: () => import('./learnmore/learnmore.module').then((m) => m.LearnMoreModule) }
        ])
    ],
    exports: [RouterModule]
})
export class TemplatesRoutingModule {}
