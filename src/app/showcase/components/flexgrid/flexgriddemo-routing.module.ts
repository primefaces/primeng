import {NgModule}     from '@angular/core';
import {RouterModule} from '@angular/router'
import {FlexGridDemo} from './flexgriddemo';

@NgModule({
	imports: [
		RouterModule.forChild([
			{path:'',component: FlexGridDemo}
		])
	],
	exports: [
		RouterModule
	]
})
export class FlexGridDemoRoutingModule {}
