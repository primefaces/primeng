import {NgModule}     from '@angular/core';
import {CommonModule} from '@angular/common';
import {RadioButtonDemo} from './radiobuttondemo';
import {RadioButtonDemoRoutingModule} from './radiobuttondemo-routing.module';

@NgModule({
	imports: [
		CommonModule,
		RadioButtonDemoRoutingModule
	],
	declarations: [
		RadioButtonDemo
	]
})
export class RadioButtonDemoModule {}
