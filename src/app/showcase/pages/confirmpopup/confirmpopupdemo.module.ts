import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ConfirmPopupDocModule } from '@doc/confirmpopup/confirmpopupdoc.module';
import { ConfirmPopupDemo } from './confirmpopupdemo';
import { ConfirmPopupDemoRoutingModule } from './confirmpopupdemo-routing.module';

@NgModule({
    imports: [CommonModule, ConfirmPopupDemoRoutingModule, ConfirmPopupDocModule],
    declarations: [ConfirmPopupDemo]
})
export class ConfirmPopupDemoModule {}
