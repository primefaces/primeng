import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router'
import {TabMenuDemo, InfoComponent, MessageComponent} from './tabmenudemo';

@NgModule({
	imports: [
		RouterModule.forChild([
			{path:'',component: TabMenuDemo},
		])
	],
	exports: [
		RouterModule
	]
})
export class TabMenuDemoRoutingModule {}
