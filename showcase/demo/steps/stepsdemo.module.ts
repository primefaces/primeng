import {NgModule}     from '@angular/core';
import {CommonModule} from '@angular/common';
import {StepsDemo} from './stepsdemo';
import {StepsDemoRoutingModule} from './stepsdemo-routing.module';

@NgModule({
	imports: [
		CommonModule,
		StepsDemoRoutingModule
	],
	declarations: [
		StepsDemo
	]
})
export class StepsDemoModule {}
