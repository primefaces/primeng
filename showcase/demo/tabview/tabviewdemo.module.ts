import {NgModule}     from '@angular/core';
import {CommonModule} from '@angular/common';
import {TabViewDemo} from './tabviewdemo';
import {TabViewDemoRoutingModule} from './tabviewdemo-routing.module';

@NgModule({
	imports: [
		CommonModule,
		TabViewDemoRoutingModule
	],
	declarations: [
		TabViewDemo
	]
})
export class TabViewDemoModule {}
