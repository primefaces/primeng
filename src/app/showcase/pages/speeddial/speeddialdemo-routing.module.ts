import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SpeedDialDemo } from './speeddialdemo';

@NgModule({
    imports: [RouterModule.forChild([{ path: '', component: SpeedDialDemo }])],
    exports: [RouterModule]
})
export class SpeedDialDemoRoutingModule {}
