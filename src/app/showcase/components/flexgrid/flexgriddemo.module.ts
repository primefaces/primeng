import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FlexGridDemo} from './flexgriddemo';
import {PanelModule} from '../../../components/panel/panel';
import {ButtonModule} from '../../../components/button/button';
import {FlexGridDemoRoutingModule} from './flexgriddemo-routing.module';
import {TabViewModule} from '../../../components/tabview/tabview';
import {CodeHighlighterModule} from '../../../components/codehighlighter/codehighlighter';

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
