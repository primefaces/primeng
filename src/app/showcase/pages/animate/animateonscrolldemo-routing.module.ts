import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AnimateOnScrollDemo } from './animateonscrolldemo';

@NgModule({
    imports: [RouterModule.forChild([{ path: '', component: AnimateOnScrollDemo }])],
    exports: [RouterModule]
})
export class AnimateOnScrollDemoRoutingModule {}
