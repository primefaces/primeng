import {NgModule}     from '@angular/core';
import {CommonModule} from '@angular/common';
import {ButtonDemo} from './buttondemo';
import {ButtonDemoRoutingModule} from './buttondemo-routing.module';

@NgModule({
	imports: [
		CommonModule,
		ButtonDemoRoutingModule
	],
	declarations: [
		ButtonDemo
	]
})
export class ButtonDemoModule {}
