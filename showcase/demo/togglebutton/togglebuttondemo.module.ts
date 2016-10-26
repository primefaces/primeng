import {NgModule}     from '@angular/core';
import {CommonModule} from '@angular/common';
import {ToggleButtonDemo} from './togglebuttondemo';
import {ToggleButtonDemoRoutingModule} from './togglebuttondemo-routing.module';

@NgModule({
	imports: [
		CommonModule,
		ToggleButtonDemoRoutingModule
	],
	declarations: [
		ToggleButtonDemo
	]
})
export class TogglebuttonDemoModule {}
