import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router'
import {TagDemo} from './tagdemo';

@NgModule({
	imports: [
		RouterModule.forChild([
			{path:'',component: TagDemo}
		])
	],
	exports: [
		RouterModule
	]
})
export class TagDemoRoutingModule {}
