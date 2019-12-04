import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FlexGridDemo} from './flexgriddemo';
import {FlexGridDemoRoutingModule} from './flexgriddemo-routing.module';
import {PanelModule} from 'primeng/panel';
import {ButtonModule} from 'primeng/button';
import {TabViewModule} from 'primeng/tabview';
import {CodeHighlighterModule} from 'primeng/codehighlighter';

@NgModule({
	imports: [
        CommonModule,
        ButtonModule,
        PanelModule,
		FlexGridDemoRoutingModule,
        TabViewModule,
        CodeHighlighterModule
	],
	declarations: [
		FlexGridDemo
	]
})
export class FlexGridDemoModule {}
