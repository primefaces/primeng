import {NgModule}     from '@angular/core';
import {CommonModule} from '@angular/common';
import {TabViewDemo} from './tabviewdemo';
import {TabViewDemoRoutingModule} from './tabviewdemo-routing.module';
import {ToastModule} from '../../../components/toast/toast';
import {TabViewModule} from '../../../components/tabview/tabview';
import {CodeHighlighterModule} from '../../../components/codehighlighter/codehighlighter';

@NgModule({
	imports: [
		CommonModule,
		TabViewDemoRoutingModule,
        ToastModule,
        TabViewModule,
        CodeHighlighterModule
	],
	declarations: [
		TabViewDemo
	]
})
export class TabViewDemoModule {}
