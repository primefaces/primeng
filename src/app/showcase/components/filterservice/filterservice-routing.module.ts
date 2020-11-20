import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router'
import {FilterServiceDemo} from './filterservicedemo';

@NgModule({
	imports: [
		RouterModule.forChild([
			{path:'',component: FilterServiceDemo}
		])
	],
	exports: [
		RouterModule
	]
})
export class FilterServiceDemoRoutingModule {}
