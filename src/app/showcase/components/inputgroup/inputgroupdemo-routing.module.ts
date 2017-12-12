import {NgModule}     from '@angular/core';
import {RouterModule} from '@angular/router'
import {InputGroupDemo} from './inputgroupdemo';

@NgModule({
	imports: [
		RouterModule.forChild([
			{path:'',component: InputGroupDemo}
		])
	],
	exports: [
		RouterModule
	]
})
export class InputGroupDemoRoutingModule {}
