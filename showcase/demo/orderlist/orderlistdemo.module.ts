import {NgModule}     from '@angular/core';
import {CommonModule} from '@angular/common';
import {OrderListDemo} from './orderlistdemo';
import {OrderListDemoRoutingModule} from './orderlistdemo-routing.module';

@NgModule({
	imports: [
		CommonModule,
		OrderListDemoRoutingModule
	],
	declarations: [
		OrderListDemo
	]
})
export class OrderListDemoModule {}
