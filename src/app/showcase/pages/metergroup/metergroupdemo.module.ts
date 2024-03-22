import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MeterGroupDocModule } from '../../doc/metergroup/metergroupdoc.module';
import { MeterGroupDemo } from './metergroupdemo';
import { MeterGroupDemoRoutingModule } from './metergroupdemo-routing.module';

@NgModule({
    imports: [CommonModule, MeterGroupDemoRoutingModule, MeterGroupDocModule],
    declarations: [MeterGroupDemo]
})
export class MeterGroupDemoModule {}
