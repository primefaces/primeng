import {NgModule}     from '@angular/core';
import {CommonModule} from '@angular/common';
import {PaginatorDemo} from './paginatordemo';
import {PaginatorDemoRoutingModule} from './paginatordemo-routing.module';
import {PaginatorModule} from '../../../components/paginator/paginator';
import {TabViewModule} from '../../../components/tabview/tabview';
import {CodeHighlighterModule} from '../../../components/codehighlighter/codehighlighter';

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
