import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router'
import {ToggleButtonDemo} from './togglebuttondemo';

@NgModule({
	imports: [
		RouterModule.forChild([
			{path:'',component: ToggleButtonDemo}
		])
	],
	exports: [
		RouterModule
	]
})
export class ToggleButtonDemoRoutingModule {}
