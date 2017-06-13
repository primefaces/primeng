import {NgModule}     from '@angular/core';
import {RouterModule} from '@angular/router'
import {TreeDemo} from './treedemo';

@NgModule({
	imports: [
		RouterModule.forChild([
			{path:'',component: TreeDemo}
		])
	],
	exports: [
		RouterModule
	]
})
export class TreeDemoRoutingModule {}
