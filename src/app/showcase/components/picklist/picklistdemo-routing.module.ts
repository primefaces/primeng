import {NgModule}     from '@angular/core';
import {RouterModule} from '@angular/router'
import {PickListDemo} from './picklistdemo';

@NgModule({
	imports: [
		RouterModule.forChild([
			{path:'',component: PickListDemo}
		])
	],
	exports: [
		RouterModule
	]
})
export class PickListDemoRoutingModule {}
