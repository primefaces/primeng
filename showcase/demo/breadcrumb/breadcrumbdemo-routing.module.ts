import {NgModule}     from '@angular/core';
import {RouterModule} from '@angular/router'
import {BreadcrumbDemo} from './breadcrumbdemo';

@NgModule({
	imports: [
		RouterModule.forChild([
			{path:'',component: BreadcrumbDemo}
		])
	],
	exports: [
		RouterModule
	]
})
export class BreadcrumbDemoRoutingModule {}
