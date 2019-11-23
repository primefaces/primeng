import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router'
import {OrganizationChartDemo} from './organizationchartdemo';

@NgModule({
	imports: [
		RouterModule.forChild([
			{path:'',component: OrganizationChartDemo}
		])
	],
	exports: [
		RouterModule
	]
})
export class OrganizationChartDemoRoutingModule {}
