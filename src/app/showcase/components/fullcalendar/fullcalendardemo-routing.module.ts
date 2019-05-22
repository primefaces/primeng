import {NgModule}     from '@angular/core';
import {RouterModule} from '@angular/router'
import {FullCalendarDemo} from './fullcalendardemo';

@NgModule({
	imports: [
		RouterModule.forChild([
			{path:'',component: FullCalendarDemo}
		])
	],
	exports: [
		RouterModule
	]
})
export class FullCalendarDemoRoutingModule {}
