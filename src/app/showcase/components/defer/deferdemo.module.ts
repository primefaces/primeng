import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DeferDemo} from './deferdemo';
import {DeferDemoRoutingModule} from './deferdemo-routing.module';
import {DeferModule} from 'primeng/defer';
import {TableModule} from 'primeng/table';
import {ToastModule} from 'primeng/toast';
import {TabViewModule} from 'primeng/tabview';
import {CodeHighlighterModule} from 'primeng/codehighlighter';

@NgModule({
	imports: [
		CommonModule,
		DeferDemoRoutingModule,
        DeferModule,
        ToastModule,
        TabViewModule,
        TableModule,
        CodeHighlighterModule
	],
	declarations: [
		DeferDemo
	]
})
export class DeferDemoModule {}
