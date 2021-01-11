import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router'
import {KnobDemo} from './knobdemo';

@NgModule({
	imports: [
		RouterModule.forChild([
			{path:'',component: KnobDemo}
		])
	],
	exports: [
		RouterModule
	]
})
export class KnobDemoRoutingModule {}
