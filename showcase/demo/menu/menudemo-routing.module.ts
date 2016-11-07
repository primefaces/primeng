import {NgModule}     from '@angular/core';
import {RouterModule} from '@angular/router'
import {MenuDemo} from './menudemo';

@NgModule({
	imports: [
		RouterModule.forChild([
			{path:'',component: MenuDemo}
		])
	],
	exports: [
		RouterModule
	]
})
export class MenuDemoRoutingModule {}
