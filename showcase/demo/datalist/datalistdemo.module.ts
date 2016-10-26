import {NgModule}     from '@angular/core';
import {CommonModule} from '@angular/common';
import {DataListDemo} from './datalistdemo';
import {DataListDemoRoutingModule} from './datalistdemo-routing.module';

@NgModule({
	imports: [
		CommonModule,
		DataListDemoRoutingModule
	],
	declarations: [
		DataListDemo
	]
})
export class DataListDemoModule {}
