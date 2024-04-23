import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StepperDemo } from './stepperdemo';

@NgModule({
    imports: [RouterModule.forChild([{ path: '', component: StepperDemo }])],
    exports: [RouterModule]
})
export class StepperDemoRoutingModule {}
