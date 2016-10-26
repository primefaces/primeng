import {NgModule}     from '@angular/core';
import {CommonModule} from '@angular/common';
import {MenuModelDemo} from './menumodeldemo';
import {MenuModelDemoRoutingModule} from './menumodeldemo-routing.module';

@NgModule({
	imports: [
		CommonModule,
		MenuModelDemoRoutingModule
	],
	declarations: [
		MenuModelDemo
	]
})
export class MenuModelDemoModule {}
