import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PopoverDemo } from './popoverdemo';

@NgModule({
    imports: [RouterModule.forChild([{ path: '', component: PopoverDemo }])],
    exports: [RouterModule]
})
export class PopoverDemoRoutingModule {}
