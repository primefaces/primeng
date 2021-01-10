import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router'
import {DividerDemo} from './dividerdemo';

@NgModule({
	imports: [
		RouterModule.forChild([
			{path:'',component: DividerDemo}
		])
	],
	exports: [
		RouterModule
	]
})
export class TagDemoRoutingModule {}
