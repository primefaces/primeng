import {NgModule}     from '@angular/core';
import {CommonModule} from '@angular/common';
import {ContextMenuDemo} from './contextmenudemo';
import {ContextMenuDemoRoutingModule} from './contextmenudemo-routing.module';

@NgModule({
	imports: [
		CommonModule,
		ContextMenuDemoRoutingModule
	],
	declarations: [
		ContextMenuDemo
	]
})
export class ContextMenuDemoModule {}
