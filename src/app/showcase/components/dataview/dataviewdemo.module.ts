import {NgModule}     from '@angular/core';
import {CommonModule} from '@angular/common';
import {DataViewDemo} from './dataviewdemo';
import {DataViewDemoRoutingModule} from './dataviewdemo-routing.module';
import {DataViewModule} from '../../../components/dataview/dataview';
import {PanelModule} from '../../../components/panel/panel';
import {DialogModule} from '../../../components/dialog/dialog';
import {TabViewModule} from '../../../components/tabview/tabview';
import {CodeHighlighterModule} from '../../../components/codehighlighter/codehighlighter';

@NgModule({
	imports: [
		CommonModule,
		DataViewDemoRoutingModule,
        DataViewModule,
        PanelModule,
        DialogModule,
        TabViewModule,
        CodeHighlighterModule
	],
	declarations: [
		DataViewDemo
	]
})
export class DataViewDemoModule {}
