import {NgModule}     from '@angular/core';
import {RouterModule} from '@angular/router'
import {TreeTableDemo} from './treetabledemo';

@NgModule({
	imports: [
		RouterModule.forChild([
			{path:'',component: TreeTableDemo}
		])
	],
	exports: [
		RouterModule
	]
})
export class TreeTableDemoRoutingModule {}
