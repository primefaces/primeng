import {NgModule}     from '@angular/core';
import {CommonModule} from '@angular/common';
import {GrowlDemo} from './growldemo';
import {GrowlDemoRoutingModule} from './growldemo-routing.module';

@NgModule({
	imports: [
		CommonModule,
		GrowlDemoRoutingModule
	],
	declarations: [
		GrowlDemo
	]
})
export class GrowlDemoModule {}
