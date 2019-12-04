import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router'
import {CalendarDemo} from './calendardemo';

@NgModule({
	imports: [
		RouterModule.forChild([
			{path:'',component: CalendarDemo}
		])
	],
	exports: [
		RouterModule
	]
})
export class CalendarDemoRoutingModule {}
