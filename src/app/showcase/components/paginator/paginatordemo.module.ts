import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PaginatorDemo} from './paginatordemo';
import {PaginatorDemoRoutingModule} from './paginatordemo-routing.module';
import {PaginatorModule} from 'primeng/paginator';
import {TabViewModule} from 'primeng/tabview';
import {CodeHighlighterModule} from 'primeng/codehighlighter';

@NgModule({
	imports: [
		CommonModule,
		PaginatorDemoRoutingModule,
        PaginatorModule,
        TabViewModule,
        CodeHighlighterModule
	],
	declarations: [
		PaginatorDemo
	]
})
export class PaginatorDemoModule {}
