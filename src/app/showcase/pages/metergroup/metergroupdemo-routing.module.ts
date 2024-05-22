import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MeterGroupDemo } from './metergroupdemo';

@NgModule({
    imports: [RouterModule.forChild([{ path: '', component: MeterGroupDemo }])],
    exports: [RouterModule]
})
export class MeterGroupDemoRoutingModule {}
