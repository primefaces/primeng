import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router'
import {CheckboxDemo} from './checkboxdemo';

@NgModule({
	imports: [
		RouterModule.forChild([
			{path:'',component: CheckboxDemo}
		])
	],
	exports: [
		RouterModule
	]
})
export class CheckboxDemoRoutingModule {}
