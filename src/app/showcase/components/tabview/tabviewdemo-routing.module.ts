import {NgModule}     from '@angular/core';
import {RouterModule} from '@angular/router'
import {TabViewDemo} from './tabviewdemo';

@NgModule({
	imports: [
		RouterModule.forChild([
			{path:'',component: TabViewDemo}
		])
	],
	exports: [
		RouterModule
	]
})
export class TabViewDemoRoutingModule {}
