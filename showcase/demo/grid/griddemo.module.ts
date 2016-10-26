import {NgModule}     from '@angular/core';
import {CommonModule} from '@angular/common';
import {GridDemo} from './griddemo';
import {GridDemoRoutingModule} from './griddemo-routing.module';
import {TabViewModule} from '../../../components/tabview/tabview';
import {CodeHighlighterModule} from '../../../components/codehighlighter/codehighlighter';

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
