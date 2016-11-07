import {NgModule}     from '@angular/core';
import {RouterModule} from '@angular/router'
import {GrowlDemo} from './growldemo';

@NgModule({
	imports: [
		RouterModule.forChild([
			{path:'',component: GrowlDemo}
		])
	],
	exports: [
		RouterModule
	]
})
export class GrowlDemoRoutingModule {}
