import {NgModule}     from '@angular/core';
import {RouterModule} from '@angular/router'
import {InplaceDemo} from './inplacedemo';

@NgModule({
	imports: [
		RouterModule.forChild([
			{path:'',component: InplaceDemo}
		])
	],
	exports: [
		RouterModule
	]
})
export class InplaceDemoRoutingModule {}
