import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PicklistDocModule } from '@doc/picklist/picklistdoc.module';
import { PickListDemo } from './picklistdemo';
import { PickListDemoRoutingModule } from './picklistdemo-routing.module';

@NgModule({
    imports: [CommonModule, PickListDemoRoutingModule, PicklistDocModule],
    declarations: [PickListDemo]
})
export class PickListDemoModule {}
