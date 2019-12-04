import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GridDemo} from './griddemo';
import {GridDemoRoutingModule} from './griddemo-routing.module';
import {TabViewModule} from 'primeng/tabview';
import {CodeHighlighterModule} from 'primeng/codehighlighter';

@NgModule({
	imports: [
		CommonModule,
		GridDemoRoutingModule,
        TabViewModule,
        CodeHighlighterModule
	],
	declarations: [
		GridDemo
	]
})
export class GridDemoModule {}
