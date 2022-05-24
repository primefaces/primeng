import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PaginatorDemo} from './paginatordemo';
import {PaginatorDemoRoutingModule} from './paginatordemo-routing.module';
import {PaginatorModule} from 'primeng/paginator';
import {TabViewModule} from 'primeng/tabview';
import {ButtonModule} from 'primeng/button';
import {AppCodeModule} from '../../app.code.component';
import {AppDemoActionsModule} from '../../app.demoactions.component';

@NgModule({
	imports: [
		CommonModule,
		PaginatorDemoRoutingModule,
        PaginatorModule,
		TabViewModule,
		AppCodeModule,
		ButtonModule,
		AppDemoActionsModule
	],
	declarations: [
		PaginatorDemo
	]
})
export class PaginatorDemoModule {}
