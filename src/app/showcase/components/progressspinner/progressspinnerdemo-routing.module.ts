import {NgModule}     from '@angular/core';
import {RouterModule} from '@angular/router'
import {ProgressSpinnerDemo} from './progressspinnerdemo';

@NgModule({
	imports: [
		RouterModule.forChild([
			{path:'',component: ProgressSpinnerDemo}
		])
	],
	exports: [
		RouterModule
	]
})
export class ProgressSpinnerDemoRoutingModule {}
