import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router'
import {SliderDemo} from './sliderdemo';

@NgModule({
	imports: [
		RouterModule.forChild([
			{path:'',component: SliderDemo}
		])
	],
	exports: [
		RouterModule
	]
})
export class SliderDemoRoutingModule {}
