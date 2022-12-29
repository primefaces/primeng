import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ConfirmPopupDemo } from './confirmpopupdemo';

@NgModule({
    imports: [RouterModule.forChild([{ path: '', component: ConfirmPopupDemo }])],
    exports: [RouterModule]
})
export class ConfirmPopupDemoRoutingModule {}
