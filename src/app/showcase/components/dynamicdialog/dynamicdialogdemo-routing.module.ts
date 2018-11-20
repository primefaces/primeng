import {NgModule}     from '@angular/core';
import {RouterModule} from '@angular/router'
import {DynamicDialogDemo} from './dynamicdialogdemo';

@NgModule({
	imports: [
		RouterModule.forChild([
			{path:'',component: DynamicDialogDemo}
		])
	],
	exports: [
		RouterModule
	]
})
export class DynamicDialogDemoRoutingModule {}
