import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router'
import {DockDemo} from './dockdemo';

@NgModule({
	imports: [
		RouterModule.forChild([
			{path:'',component: DockDemo}
		])
	],
	exports: [
		RouterModule
	]
})
export class DockDemoRoutingModule {}
