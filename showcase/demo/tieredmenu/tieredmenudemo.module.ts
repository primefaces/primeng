import {NgModule}     from '@angular/core';
import {CommonModule} from '@angular/common';
import {TieredMenuDemo} from './tieredmenudemo';
import {TieredMenuDemoRoutingModule} from './tieredmenudemo-routing.module';

@NgModule({
	imports: [
		CommonModule,
		TieredMenuDemoRoutingModule
	],
	declarations: [
		TieredMenuDemo
	]
})
export class TieredMenuDemoModule {}
