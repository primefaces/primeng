import {NgModule}     from '@angular/core';
import {RouterModule} from '@angular/router'
import {SlideMenuDemo} from './slidemenudemo';

@NgModule({
	imports: [
		RouterModule.forChild([
			{path:'',component: SlideMenuDemo}
		])
	],
	exports: [
		RouterModule
	]
})
export class SlideMenuDemoRoutingModule {}
