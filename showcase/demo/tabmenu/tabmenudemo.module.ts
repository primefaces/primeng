import {NgModule}     from '@angular/core';
import {CommonModule} from '@angular/common';
import {TabMenuDemo} from './tabmenudemo';
import {TabMenuDemoRoutingModule} from './tabmenudemo-routing.module';

@NgModule({
	imports: [
		CommonModule,
		TabMenuDemoRoutingModule
	],
	declarations: [
		TabMenuDemo
	]
})
export class TabMenuDemoModule {}
