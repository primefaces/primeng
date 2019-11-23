import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router'
import {AutoCompleteDemo} from './autocompletedemo';

@NgModule({
	imports: [
		RouterModule.forChild([
			{path:'',component: AutoCompleteDemo}
		])
	],
	exports: [
		RouterModule
	]
})
export class AutoCompleteDemoRoutingModule {}
