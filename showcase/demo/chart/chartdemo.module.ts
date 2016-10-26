import {NgModule}     from '@angular/core';
import {CommonModule} from '@angular/common';
import {ChartDemo} from './chartdemo';
import {ChartDemoRoutingModule} from './chartdemo-routing.module';

@NgModule({
	imports: [
		CommonModule,
		ChartDemoRoutingModule
	],
	declarations: [
		ChartDemo
	]
})
export class ChartDemoModule {}
