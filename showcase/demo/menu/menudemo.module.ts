import {NgModule}     from '@angular/core';
import {CommonModule} from '@angular/common';
import {MenuDemo} from './menudemo';
import {MenuDemoRoutingModule} from './menudemo-routing.module';

@NgModule({
	imports: [
		CommonModule,
		MenuDemoRoutingModule
	],
	declarations: [
		MenuDemo
	]
})
export class MenuDemoModule {}
