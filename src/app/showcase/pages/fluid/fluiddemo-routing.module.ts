import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FluidDemo } from './fluiddemo';

@NgModule({
    imports: [RouterModule.forChild([{ path: '', component: FluidDemo }])],
    exports: [RouterModule]
})
export class FluidDemoRoutingModule {}
