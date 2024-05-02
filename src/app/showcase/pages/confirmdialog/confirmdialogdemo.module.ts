import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ConfirmDialogDocModule } from '@doc/confirmdialog/confirmdialogdoc.module';
import { ConfirmDialogDemo } from './confirmdialogdemo';
import { ConfirmDialogDemoRoutingModule } from './confirmdialogdemo-routing.module';

@NgModule({
    imports: [CommonModule, ConfirmDialogDemoRoutingModule, ConfirmDialogDocModule],
    declarations: [ConfirmDialogDemo]
})
export class ConfirmDialogDemoModule {}
