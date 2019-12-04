import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router'
import {ContextMenuDemo} from './contextmenudemo';

@NgModule({
	imports: [
		RouterModule.forChild([
			{path:'',component: ContextMenuDemo}
		])
	],
	exports: [
		RouterModule
	]
})
export class ContextMenuDemoRoutingModule {}
