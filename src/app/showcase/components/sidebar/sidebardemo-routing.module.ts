import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router'
import {SidebarDemo} from './sidebardemo';

@NgModule({
	imports: [
		RouterModule.forChild([
			{path:'',component: SidebarDemo}
		])
	],
	exports: [
		RouterModule
	]
})
export class SidebarDemoRoutingModule {}
