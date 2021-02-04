import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router'
import {RippleDemo} from './rippledemo';

@NgModule({
	imports: [
		RouterModule.forChild([
			{path:'',component: RippleDemo}
		])
	],
	exports: [
		RouterModule
	]
})
export class RippleDemoRoutingModule {}
