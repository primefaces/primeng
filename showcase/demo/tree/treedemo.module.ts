import {NgModule}     from '@angular/core';
import {CommonModule} from '@angular/common';
import {TreeDemo} from './treedemo';
import {TreeDemoRoutingModule} from './treedemo-routing.module';

@NgModule({
	imports: [
		CommonModule,
		TreeDemoRoutingModule
	],
	declarations: [
		TreeDemo
	]
})
export class TreeDemoModule {}
