import {NgModule}     from '@angular/core';
import {CommonModule} from '@angular/common';
import {PickListDemo} from './picklistdemo';
import {PickListDemoRoutingModule} from './picklistdemo-routing.module';

@NgModule({
	imports: [
		CommonModule,
		PickListDemoRoutingModule
	],
	declarations: [
		PickListDemo
	]
})
export class PickListDemoModule {}
