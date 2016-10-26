import {NgModule}     from '@angular/core';
import {CommonModule} from '@angular/common';
import {CheckboxDemo} from './checkboxdemo';
import {CheckboxDemoRoutingModule} from './checkboxdemo-routing.module';

@NgModule({
	imports: [
		CommonModule,
		CheckboxDemoRoutingModule
	],
	declarations: [
		CheckboxDemo
	]
})
export class CheckboxDemoModule {}
