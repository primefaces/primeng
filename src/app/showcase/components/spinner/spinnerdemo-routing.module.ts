import {NgModule}     from '@angular/core';
import {RouterModule} from '@angular/router'
import {SpinnerDemo} from './spinnerdemo';

@NgModule({
	imports: [
		RouterModule.forChild([
			{path:'',component: SpinnerDemo}
		])
	],
	exports: [
		RouterModule
	]
})
export class SpinnerDemoRoutingModule {}
