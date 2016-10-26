import {NgModule}     from '@angular/core';
import {CommonModule} from '@angular/common';
import {PaginatorDemo} from './paginatordemo';
import {PaginatorDemoRoutingModule} from './paginatordemo-routing.module';

@NgModule({
	imports: [
		CommonModule,
		PaginatorDemoRoutingModule
	],
	declarations: [
		PaginatorDemo
	]
})
export class PaginatorDemoModule {}
