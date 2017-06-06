import {NgModule}     from '@angular/core';
import {RouterModule} from '@angular/router'
import {GMapDemo} from './gmapdemo';

@NgModule({
	imports: [
		RouterModule.forChild([
			{path:'',component: GMapDemo}
		])
	],
	exports: [
		RouterModule
	]
})
export class GMapDemoRoutingModule {}
