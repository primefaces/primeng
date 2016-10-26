import {NgModule}     from '@angular/core';
import {CommonModule} from '@angular/common';
import {GMapDemo} from './gmapdemo';
import {GMapDemoRoutingModule} from './gmapdemo-routing.module';

@NgModule({
	imports: [
		CommonModule,
		GMapDemoRoutingModule
	],
	declarations: [
		GMapDemo
	]
})
export class GmapDemoModule {}
