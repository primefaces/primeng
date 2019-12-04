import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ContextMenuDemo} from './contextmenudemo';
import {ContextMenuDemoRoutingModule} from './contextmenudemo-routing.module';
import {ContextMenuModule} from 'primeng/contextmenu';
import {TabViewModule} from 'primeng/tabview';
import {CodeHighlighterModule} from 'primeng/codehighlighter';

@NgModule({
	imports: [
		CommonModule,
		ContextMenuDemoRoutingModule,
        ContextMenuModule,
        TabViewModule,
        CodeHighlighterModule
	],
	declarations: [
		ContextMenuDemo
	]
})
export class ContextMenuDemoModule {}
