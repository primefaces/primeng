import {NgModule}     from '@angular/core';
import {RouterModule} from '@angular/router'
import {ValidationDemo} from './validationdemo';

@NgModule({
	imports: [
		RouterModule.forChild([
			{path:'',component: ValidationDemo}
		])
	],
	exports: [
		RouterModule
	]
})
export class ValidationDemoRoutingModule {}
