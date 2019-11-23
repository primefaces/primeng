import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router'
import {ListboxDemo} from './listboxdemo';

@NgModule({
	imports: [
		RouterModule.forChild([
			{path:'',component: ListboxDemo}
		])
	],
	exports: [
		RouterModule
	]
})
export class ListboxDemoRoutingModule {}
