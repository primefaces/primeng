import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PanelMenuDemo} from './panelmenudemo';
import {PanelMenuDemoRoutingModule} from './panelmenudemo-routing.module';
import {PanelMenuModule} from 'primeng/panelmenu';
import {TabViewModule} from 'primeng/tabview';
import {CodeHighlighterModule} from 'primeng/codehighlighter';

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
