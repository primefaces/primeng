import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DataViewDocModule } from '../../doc/dataview/dataviewdoc.module';
import { DataViewDemo } from './dataviewdemo';
import { DataViewDemoRoutingModule } from './dataviewdemo-routing.module';

@NgModule({
    imports: [CommonModule, DataViewDemoRoutingModule, DataViewDocModule],
    declarations: [DataViewDemo]
})
export class DataViewDemoModule {}
