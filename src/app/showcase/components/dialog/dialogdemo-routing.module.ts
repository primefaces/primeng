import {NgModule}     from '@angular/core';
import {RouterModule} from '@angular/router'
import {DialogDemo} from './dialogdemo';

@NgModule({
	imports: [
		RouterModule.forChild([
			{path:'',component: DialogDemo}
		])
	],
	exports: [
		RouterModule
	]
})
export class DialogDemoRoutingModule {}
