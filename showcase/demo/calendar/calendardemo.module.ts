import {NgModule}     from '@angular/core';
import {CommonModule} from '@angular/common';
import {CalendarDemo} from './calendardemo';
import {CalendarDemoRoutingModule} from './calendardemo-routing.module';

@NgModule({
	imports: [
		CommonModule,
		CalendarDemoRoutingModule
	],
	declarations: [
		CalendarDemo
	]
})
export class CalendarDemoModule {}
