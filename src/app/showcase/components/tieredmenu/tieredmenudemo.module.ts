import {NgModule}     from '@angular/core';
import {CommonModule} from '@angular/common';
import {TieredMenuDemo} from './tieredmenudemo';
import {TieredMenuDemoRoutingModule} from './tieredmenudemo-routing.module';
import {TieredMenuModule} from '../../../components/tieredmenu/tieredmenu';
import {ButtonModule} from '../../../components/button/button';
import {TabViewModule} from '../../../components/tabview/tabview';
import {CodeHighlighterModule} from '../../../components/codehighlighter/codehighlighter';

@NgModule({
	imports: [
		CommonModule,
		TieredMenuDemoRoutingModule,
        TieredMenuModule,
        ButtonModule,
        TabViewModule,
        CodeHighlighterModule
	],
	declarations: [
		TieredMenuDemo
	]
})
export class TieredMenuDemoModule {}
