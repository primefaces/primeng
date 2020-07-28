import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OrderListDemo} from './orderlistdemo';
import {OrderListDemoRoutingModule} from './orderlistdemo-routing.module';
import {OrderListModule} from 'primeng/orderlist';
import {TabViewModule} from 'primeng/tabview';
import {CodeHighlighterModule} from 'primeng/codehighlighter';
import { AppCodeModule } from '../../app.code.component';

@NgModule({
	imports: [
		CommonModule,
		OrderListDemoRoutingModule,
        OrderListModule,
		TabViewModule,
		AppCodeModule,
        CodeHighlighterModule
	],
	declarations: [
		OrderListDemo
	]
})
export class OrderListDemoModule {}
