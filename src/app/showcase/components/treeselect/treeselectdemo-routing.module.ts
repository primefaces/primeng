import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router'
import {TreeSelectDemo} from './treeselectdemo';

@NgModule({
	imports: [
		RouterModule.forChild([
			{path:'',component: TreeSelectDemo}
		])
	],
	exports: [
		RouterModule
	]
})
export class TreeSelectDemoRoutingModule {}
