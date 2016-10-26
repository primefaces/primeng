import {NgModule}     from '@angular/core';
import {CommonModule} from '@angular/common';
import {GridDemo} from './griddemo';
import {GridDemoRoutingModule} from './griddemo-routing.module';

@NgModule({
	imports: [
		CommonModule,
		GridDemoRoutingModule
	],
	declarations: [
		GridDemo
	]
})
export class GridDemoModule {}
