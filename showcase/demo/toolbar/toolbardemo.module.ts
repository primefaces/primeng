import {NgModule}     from '@angular/core';
import {CommonModule} from '@angular/common';
import {ToolbarDemo} from './toolbardemo';
import {ToolbarDemoRoutingModule} from './toolbardemo-routing.module';

@NgModule({
	imports: [
		CommonModule,
		ToolbarDemoRoutingModule
	],
	declarations: [
		ToolbarDemo
	]
})
export class ToolbarDemoModule {}
