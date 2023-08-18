import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AnimateDemo } from './animatedemo';

@NgModule({
    imports: [RouterModule.forChild([{ path: '', component: AnimateDemo }])],
    exports: [RouterModule]
})
export class AnimateDemoRoutingModule {}
