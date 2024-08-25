import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DrawerDemo } from './drawerdemo';

@NgModule({
    imports: [RouterModule.forChild([{ path: '', component: DrawerDemo }])],
    exports: [RouterModule]
})
export class DrawerDemoRoutingModule {}
