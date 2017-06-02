import {NgModule}     from '@angular/core';
import {RouterModule} from '@angular/router'
import {TabMenuDemo} from './tabmenudemo';

@NgModule({
	imports: [
		RouterModule.forChild([
			{path:'',component: TabMenuDemo}
		])
	],
	exports: [
		RouterModule
	]
})
export class TabMenuDemoRoutingModule {}
