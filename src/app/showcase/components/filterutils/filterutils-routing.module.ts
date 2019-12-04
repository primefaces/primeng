import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router'
import { FilterUtilsDemo } from './filterutilsdemo';

@NgModule({
	imports: [
		RouterModule.forChild([
			{path:'',component: FilterUtilsDemo}
		])
	],
	exports: [
		RouterModule
	]
})
export class FilterUtilsDemoRoutingModule {}
