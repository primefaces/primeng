import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OrderListDemo} from './orderlistdemo';
import {OrderListDemoRoutingModule} from './orderlistdemo-routing.module';
import {OrderListModule} from 'primeng/orderlist';
import {TabViewModule} from 'primeng/tabview';
import {CodeHighlighterModule} from 'primeng/codehighlighter';

@NgModule({
	imports: [
		CommonModule,
		OrderListDemoRoutingModule,
        OrderListModule,
        TabViewModule,
        CodeHighlighterModule
	],
	declarations: [
		OrderListDemo
	]
})
export class OrderListDemoModule {}
