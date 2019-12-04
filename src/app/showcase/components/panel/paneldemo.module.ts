import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PanelDemo} from './paneldemo';
import {PanelDemoRoutingModule} from './paneldemo-routing.module';
import {PanelModule} from 'primeng/panel';
import {ToastModule} from 'primeng/toast';
import {SplitButtonModule} from 'primeng/splitbutton';
import {TabViewModule} from 'primeng/tabview';
import {CodeHighlighterModule} from 'primeng/codehighlighter';

@NgModule({
	imports: [
		CommonModule,
		PanelDemoRoutingModule,
        PanelModule,
        ToastModule,
        SplitButtonModule,
        TabViewModule,
        CodeHighlighterModule
	],
	declarations: [
		PanelDemo
	]
})
export class PanelDemoModule {}
