import {NgModule}     from '@angular/core';
import {CommonModule} from '@angular/common';
import {SelectButtonDemo} from './selectbuttondemo';
import {SelectButtonDemoRoutingModule} from './selectbuttondemo-routing.module';

@NgModule({
	imports: [
		CommonModule,
		SelectButtonDemoRoutingModule
	],
	declarations: [
		SelectButtonDemo
	]
})
export class SelectButtonDemoModule {}
