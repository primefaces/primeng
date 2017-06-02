import {NgModule}     from '@angular/core';
import {RouterModule} from '@angular/router'
import {ConfirmDialogDemo} from './confirmdialogdemo';

@NgModule({
	imports: [
		RouterModule.forChild([
			{path:'',component: ConfirmDialogDemo}
		])
	],
	exports: [
		RouterModule
	]
})
export class ConfirmDialogDemoRoutingModule {}
