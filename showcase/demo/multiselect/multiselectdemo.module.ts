import {NgModule}     from '@angular/core';
import {CommonModule} from '@angular/common';
import {MultiSelectDemo} from './multiselectdemo';
import {MultiSelectDemoRoutingModule} from './multiselectdemo-routing.module';

@NgModule({
	imports: [
		CommonModule,
		MultiSelectDemoRoutingModule
	],
	declarations: [
		MultiSelectDemo
	]
})
export class MultiSelectDemoModule {}
