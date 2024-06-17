import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StyleClassDemo } from './styleclassdemo';

@NgModule({
    imports: [RouterModule.forChild([{ path: '', component: StyleClassDemo }])],
    exports: [RouterModule]
})
export class StyleClassDemoRoutingModule {}
