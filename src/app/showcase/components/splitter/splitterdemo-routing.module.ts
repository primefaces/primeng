import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router'
import {SplitterDemo} from './splitterdemo';

@NgModule({
	imports: [
		RouterModule.forChild([
			{path:'',component: SplitterDemo}
		])
	],
	exports: [
		RouterModule
	]
})
export class SplitterDemoRoutingModule {}
