import {NgModule}     from '@angular/core';
import {RouterModule} from '@angular/router'
import {SelectButtonDemo} from './selectbuttondemo';

@NgModule({
	imports: [
		RouterModule.forChild([
			{path:'',component: SelectButtonDemo}
		])
	],
	exports: [
		RouterModule
	]
})
export class SelectButtonDemoRoutingModule {}
