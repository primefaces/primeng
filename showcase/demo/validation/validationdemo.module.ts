import {NgModule}     from '@angular/core';
import {CommonModule} from '@angular/common';
import {ValidationDemo} from './validationdemo';
import {ValidationDemoRoutingModule} from './validationdemo-routing.module';

@NgModule({
	imports: [
		CommonModule,
		ValidationDemoRoutingModule
	],
	declarations: [
		ValidationDemo
	]
})
export class ValidationDemoModule {}
