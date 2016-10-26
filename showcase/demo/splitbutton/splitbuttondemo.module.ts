import {NgModule}     from '@angular/core';
import {CommonModule} from '@angular/common';
import {SplitButtonDemo} from './splitbuttondemo';
import {SplitButtonDemoRoutingModule} from './splitbuttondemo-routing.module';

@NgModule({
	imports: [
		CommonModule,
		SplitButtonDemoRoutingModule
	],
	declarations: [
		SplitButtonDemo
	]
})
export class SplitButtonDemooModule {}
