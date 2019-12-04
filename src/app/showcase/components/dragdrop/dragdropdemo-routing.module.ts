import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router'
import {DragDropDemo} from './dragdropdemo';

@NgModule({
	imports: [
		RouterModule.forChild([
			{path:'',component: DragDropDemo}
		])
	],
	exports: [
		RouterModule
	]
})
export class DragDropDemoRoutingModule {}
