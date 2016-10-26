import {NgModule}     from '@angular/core';
import {CommonModule} from '@angular/common';
import {EditorDemo} from './editordemo';
import {EditorDemoRoutingModule} from './editordemo-routing.module';

@NgModule({
	imports: [
		CommonModule,
		EditorDemoRoutingModule
	],
	declarations: [
		EditorDemo
	]
})
export class EditorDemoModule {}
