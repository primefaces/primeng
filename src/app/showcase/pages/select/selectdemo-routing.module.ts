import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SelectDemo } from './selectdemo';

@NgModule({
    imports: [RouterModule.forChild([{ path: '', component: SelectDemo }])],
    exports: [RouterModule]
})
export class SelectDemoRoutingModule {}
