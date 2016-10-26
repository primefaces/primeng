import {NgModule}     from '@angular/core';
import {CommonModule} from '@angular/common';
import {TabMenuDemo} from './tabmenudemo';
import {TabMenuDemoRoutingModule} from './tabmenudemo-routing.module';
import {TabMenuModule} from '../../../components/tabmenu/tabmenu';
import {TabViewModule} from '../../../components/tabview/tabview';
import {CodeHighlighterModule} from '../../../components/codehighlighter/codehighlighter';

@NgModule({
	imports: [
		CommonModule,
		TabMenuDemoRoutingModule,
        TabMenuModule,
        TabViewModule,
        CodeHighlighterModule
	],
	declarations: [
		TabMenuDemo
	]
})
export class TabMenuDemoModule {}
