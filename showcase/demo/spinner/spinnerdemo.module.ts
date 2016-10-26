import {NgModule}     from '@angular/core';
import {CommonModule} from '@angular/common';
import {SpinnerDemo} from './spinnerdemo';
import {SpinnerDemoRoutingModule} from './spinnerdemo-routing.module';

@NgModule({
	imports: [
		CommonModule,
		SpinnerDemoRoutingModule
	],
	declarations: [
		SpinnerDemo
	]
})
export class SpinnerDemoModule {}
