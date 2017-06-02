import {NgModule}     from '@angular/core';
import {CommonModule} from '@angular/common';
import {PanelMenuDemo} from './panelmenudemo';
import {PanelMenuDemoRoutingModule} from './panelmenudemo-routing.module';
import {PanelMenuModule} from '../../../components/panelmenu/panelmenu';
import {TabViewModule} from '../../../components/tabview/tabview';
import {CodeHighlighterModule} from '../../../components/codehighlighter/codehighlighter';

@NgModule({
	imports: [
		CommonModule,
		PanelMenuDemoRoutingModule,
        PanelMenuModule,
        TabViewModule,
        CodeHighlighterModule
	],
	declarations: [
		PanelMenuDemo
	]
})
export class PanelMenuDemoModule {}
