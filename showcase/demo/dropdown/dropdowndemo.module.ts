import {NgModule}     from '@angular/core';
import {CommonModule} from '@angular/common';
import {DropdownDemo} from './dropdowndemo';
import {DropdownDemoRoutingModule} from './dropdowndemo-routing.module';

@NgModule({
	imports: [
		CommonModule,
		DropdownDemoRoutingModule
	],
	declarations: [
		DropdownDemo
	]
})
export class DropdownDemoModule {}
