import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router'
import {DeferDemo} from './deferdemo';

@NgModule({
	imports: [
		RouterModule.forChild([
			{path:'',component: DeferDemo}
		])
	],
	exports: [
		RouterModule
	]
})
export class DeferDemoRoutingModule {}
