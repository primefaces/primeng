import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ScrollPanelDemo} from './scrollpaneldemo';
import {ScrollPanelModule} from 'primeng/scrollpanel';
import {ScrollPanelDemoRoutingModule} from './scrollpaneldemo-routing.module';
import {TabViewModule} from 'primeng/tabview';
import {CodeHighlighterModule} from 'primeng/codehighlighter';

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
