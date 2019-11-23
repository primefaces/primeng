import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TieredMenuDemo} from './tieredmenudemo';
import {TieredMenuDemoRoutingModule} from './tieredmenudemo-routing.module';
import {TieredMenuModule} from 'primeng/tieredmenu';
import {ButtonModule} from 'primeng/button';
import {TabViewModule} from 'primeng/tabview';
import {CodeHighlighterModule} from 'primeng/codehighlighter';

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
