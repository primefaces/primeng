import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OverlayDemo } from './overlaydemo';

@NgModule({
    imports: [RouterModule.forChild([{ path: '', component: OverlayDemo }])],
    exports: [RouterModule]
})
export class OverlayDemoRoutingModule {}
