import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TabViewDemo} from './tabviewdemo';
import {TabViewDemoRoutingModule} from './tabviewdemo-routing.module';
import {ToastModule} from 'primeng/toast';
import {TabViewModule} from 'primeng/tabview';
import {CodeHighlighterModule} from 'primeng/codehighlighter';

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
