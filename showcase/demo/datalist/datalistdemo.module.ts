import {NgModule}     from '@angular/core';
import {CommonModule} from '@angular/common';
import {DataListDemo} from './datalistdemo';
import {DataListDemoRoutingModule} from './datalistdemo-routing.module';
import {DataListModule} from '../../../components/datalist/datalist';
import {DialogModule} from '../../../components/dialog/dialog';
import {TabViewModule} from '../../../components/tabview/tabview';
import {CodeHighlighterModule} from '../../../components/codehighlighter/codehighlighter';

@NgModule({
	imports: [
		CommonModule,
		DataListDemoRoutingModule,
        DataListModule,
        DialogModule,
        TabViewModule,
        CodeHighlighterModule
	],
	declarations: [
		DataListDemo
	]
})
export class DataListDemoModule {}
