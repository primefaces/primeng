import {NgModule}     from '@angular/core';
import {CommonModule} from '@angular/common';
import {PanelDemo} from './paneldemo';
import {PanelDemoRoutingModule} from './paneldemo-routing.module';

@NgModule({
	imports: [
		CommonModule,
		PanelDemoRoutingModule
	],
	declarations: [
		PanelDemo
	]
})
export class PanelDemoModule {}
