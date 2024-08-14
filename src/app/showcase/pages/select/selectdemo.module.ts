import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SelectDocModule } from '@doc/select/dropdowndoc.module';
import { SelectDemo } from './selectdemo';
import { SelectDemoRoutingModule } from './selectdemo-routing.module';

@NgModule({
    imports: [CommonModule, SelectDemoRoutingModule, SelectDocModule],
    declarations: [SelectDemo],
})
export class SelectDemoModule {}
