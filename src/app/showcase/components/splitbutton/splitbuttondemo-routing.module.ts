import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router'
import {SplitButtonDemo} from './splitbuttondemo';

@NgModule({
	imports: [
		RouterModule.forChild([
			{path:'',component: SplitButtonDemo}
		])
	],
	exports: [
		RouterModule
	]
})
export class SplitButtonDemoRoutingModule {}
