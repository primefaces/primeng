import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DropdownDocModule } from '../../doc/dropdown/dropdowndoc.module';
import { DropdownDemo } from './dropdowndemo';
import { DropdownDemoRoutingModule } from './dropdowndemo-routing.module';

@NgModule({
    imports: [CommonModule, DropdownDemoRoutingModule, DropdownDocModule],
    declarations: [DropdownDemo]
})
export class DropdownDemoModule {}
