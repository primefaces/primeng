import {NgModule}     from '@angular/core';
import {CommonModule} from '@angular/common';
import {DragDropDemo} from './dragdropdemo';
import {DragDropDemoRoutingModule} from './dragdropdemo-routing.module';

@NgModule({
	imports: [
		CommonModule,
		DragDropDemoRoutingModule
	],
	declarations: [
		DragDropDemo
	]
})
export class DragDropDemoModule {}
