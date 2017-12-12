import {NgModule}     from '@angular/core';
import {RouterModule} from '@angular/router'
import {MultiSelectDemo} from './multiselectdemo';

@NgModule({
	imports: [
		RouterModule.forChild([
			{path:'',component: MultiSelectDemo}
		])
	],
	exports: [
		RouterModule
	]
})
export class MultiSelectDemoRoutingModule {}
