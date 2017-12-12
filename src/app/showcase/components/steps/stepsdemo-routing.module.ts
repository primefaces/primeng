import {NgModule}     from '@angular/core';
import {RouterModule} from '@angular/router'
import {StepsDemo} from './stepsdemo';

@NgModule({
	imports: [
		RouterModule.forChild([
			{path:'',component: StepsDemo}
		])
	],
	exports: [
		RouterModule
	]
})
export class StepsDemoRoutingModule {}
