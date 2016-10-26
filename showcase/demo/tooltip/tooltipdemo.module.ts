import {NgModule}     from '@angular/core';
import {CommonModule} from '@angular/common';
import {TooltipDemo} from './tooltipdemo';
import {TooltipDemoRoutingModule} from './tooltipdemo-routing.module';

@NgModule({
	imports: [
		CommonModule,
		TooltipDemoRoutingModule
	],
	declarations: [
		TooltipDemo
	]
})
export class TooltipDemoModule {}
