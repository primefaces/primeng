import {NgModule}     from '@angular/core';
import {CommonModule} from '@angular/common';
import {SliderDemo} from './sliderdemo';
import {SliderDemoRoutingModule} from './sliderdemo-routing.module';

@NgModule({
	imports: [
		CommonModule,
		SliderDemoRoutingModule
	],
	declarations: [
		SliderDemo
	]
})
export class SliderDemoModule {}
