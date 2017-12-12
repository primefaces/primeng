import {NgModule}     from '@angular/core';
import {CommonModule} from '@angular/common';
import {ScrollPanelModule} from '../../../components/scrollpanel/scrollpanel';
import {ScrollPanelDemo} from './scrollpaneldemo';
import {ScrollPanelDemoRoutingModule} from './scrollpaneldemo-routing.module';
import {TabViewModule} from '../../../components/tabview/tabview';
import {CodeHighlighterModule} from '../../../components/codehighlighter/codehighlighter';

@NgModule({
	imports: [
		CommonModule,
		ScrollPanelModule,
		ScrollPanelDemoRoutingModule,
        TabViewModule,
        CodeHighlighterModule
	],
	declarations: [
		ScrollPanelDemo
	]
})
export class ScrollPanelDemoModule {}
