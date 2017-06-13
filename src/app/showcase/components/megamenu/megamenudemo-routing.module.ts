import {NgModule}     from '@angular/core';
import {RouterModule} from '@angular/router'
import {MegaMenuDemo} from './megamenudemo';

@NgModule({
	imports: [
		RouterModule.forChild([
			{path:'',component: MegaMenuDemo}
		])
	],
	exports: [
		RouterModule
	]
})
export class MegaMenuDemoRoutingModule {}
