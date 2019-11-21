import {NgModule}     from '@angular/core';
import {RouterModule} from '@angular/router'
import {PaginatorDemo} from './paginatordemo';

@NgModule({
	imports: [
		RouterModule.forChild([
			{path:'',component: PaginatorDemo}
		])
	],
	exports: [
		RouterModule
	]
})
export class PaginatorDemoRoutingModule {}
