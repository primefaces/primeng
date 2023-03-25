import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DynamicDialogDocModule } from '../../doc/dynamicdialog/dynamicdialogdoc.module';
import { DynamicDialogDemo } from './dynamicdialogdemo';
import { DynamicDialogDemoRoutingModule } from './dynamicdialogdemo-routing.module';

@NgModule({
    imports: [CommonModule, DynamicDialogDemoRoutingModule, DynamicDialogDocModule],
    declarations: [DynamicDialogDemo]
})
export class DynamicDialogDemoModule {}
