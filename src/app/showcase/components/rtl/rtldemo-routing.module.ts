import {NgModule}     from '@angular/core';
import {RouterModule} from '@angular/router'
import {RTLDemo} from './rtldemo';

@NgModule({
	imports: [
		RouterModule.forChild([
			{path:'',component: RTLDemo}
		])
	],
	exports: [
		RouterModule
	]
})
export class RTLDemoRoutingModule {}
