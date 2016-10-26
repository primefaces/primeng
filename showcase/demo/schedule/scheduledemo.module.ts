import {NgModule}     from '@angular/core';
import {CommonModule} from '@angular/common';
import {ScheduleDemo} from './scheduledemo';
import {ScheduleDemoRoutingModule} from './scheduledemo-routing.module';

@NgModule({
	imports: [
		CommonModule,
		ScheduleDemoRoutingModule
	],
	declarations: [
		ScheduleDemo
	]
})
export class ScheduleDemoModule {}
