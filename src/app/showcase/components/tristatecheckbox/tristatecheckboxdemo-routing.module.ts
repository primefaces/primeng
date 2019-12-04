import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router'
import {TriStateCheckboxDemo} from './tristatecheckboxdemo';

@NgModule({
	imports: [
		RouterModule.forChild([
			{path:'',component: TriStateCheckboxDemo}
		])
	],
	exports: [
		RouterModule
	]
})
export class TriStateCheckboxDemoRoutingModule {}
