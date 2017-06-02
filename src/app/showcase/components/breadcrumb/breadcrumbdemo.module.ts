import {NgModule}     from '@angular/core';
import {CommonModule} from '@angular/common';
import {BreadcrumbDemo} from './breadcrumbdemo';
import {BreadcrumbDemoRoutingModule} from './breadcrumbdemo-routing.module';
import {BreadcrumbModule} from '../../../components/breadcrumb/breadcrumb';
import {TabViewModule} from '../../../components/tabview/tabview';
import {CodeHighlighterModule} from '../../../components/codehighlighter/codehighlighter';

@NgModule({
	imports: [
		CommonModule,
		BreadcrumbDemoRoutingModule,
        BreadcrumbModule,
        TabViewModule,
        CodeHighlighterModule
	],
	declarations: [
		BreadcrumbDemo
	]
})
export class BreadcrumbDemoModule {}
