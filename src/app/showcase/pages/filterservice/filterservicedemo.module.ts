import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FilterServiceDocModule } from '../../doc/filterservice/filterservicedoc.module';
import { FilterServiceDemoRoutingModule } from './filterservice-routing.module';
import { FilterServiceDemo } from './filterservicedemo';

@NgModule({
    imports: [CommonModule, FilterServiceDemoRoutingModule, FilterServiceDocModule],
    declarations: [FilterServiceDemo]
})
export class FilterServiceDemoModule {}
