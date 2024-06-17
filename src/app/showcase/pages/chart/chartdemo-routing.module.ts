import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ChartDemo } from './chartdemo';

@NgModule({
    imports: [RouterModule.forChild([{ path: '', component: ChartDemo }])],
    exports: [RouterModule]
})
export class ChartDemoRoutingModule {}
