import {NgModule}     from '@angular/core';
import {CommonModule} from '@angular/common';
import {TriStateCheckboxDemo} from './tristatecheckboxdemo';
import {TriStateCheckboxDemoRoutingModule} from './tristatecheckboxdemo-routing.module';

@NgModule({
	imports: [
		CommonModule,
		TriStateCheckboxDemoRoutingModule
	],
	declarations: [
		TriStateCheckboxDemo
	]
})
export class TriStateCheckboxDemoModule {}
