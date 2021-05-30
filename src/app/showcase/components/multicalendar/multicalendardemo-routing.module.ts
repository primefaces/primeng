import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router'
import {MultiCalendarDemo} from './multicalendardemo';

@NgModule({
	imports: [
		RouterModule.forChild([
			{path:'',component: MultiCalendarDemo}
		])
	],
	exports: [
		RouterModule
	]
})
export class MultiCalendarDemoRoutingModule {}
