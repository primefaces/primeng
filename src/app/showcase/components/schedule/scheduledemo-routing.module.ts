import {NgModule}     from '@angular/core';
import {RouterModule} from '@angular/router'
import {ScheduleDemo} from './scheduledemo';

@NgModule({
	imports: [
		RouterModule.forChild([
			{path:'',component: ScheduleDemo}
		])
	],
	exports: [
		RouterModule
	]
})
export class ScheduleDemoRoutingModule {}
