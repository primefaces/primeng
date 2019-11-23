import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router'
import {MenuModelDemo} from './menumodeldemo';

@NgModule({
	imports: [
		RouterModule.forChild([
			{path:'',component: MenuModelDemo}
		])
	],
	exports: [
		RouterModule
	]
})
export class MenuModelDemoRoutingModule {}
