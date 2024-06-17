import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MultiSelectDocModule } from '@doc/multiselect/multiselectdoc.module';
import { MultiSelectDemo } from './multiselectdemo';
import { MultiSelectDemoRoutingModule } from './multiselectdemo-routing.module';

@NgModule({
    imports: [CommonModule, MultiSelectDemoRoutingModule, MultiSelectDocModule],
    declarations: [MultiSelectDemo]
})
export class MultiSelectDemoModule {}
