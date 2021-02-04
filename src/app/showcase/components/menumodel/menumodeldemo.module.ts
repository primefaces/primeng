import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MenuModelDemo} from './menumodeldemo';
import {MenuModelDemoRoutingModule} from './menumodeldemo-routing.module';
import {AppCodeModule} from '../../app.code.component';

@NgModule({
	imports: [
		CommonModule,
		MenuModelDemoRoutingModule,
		AppCodeModule
	],
	declarations: [
		MenuModelDemo
	]
})
export class MenuModelDemoModule {}
