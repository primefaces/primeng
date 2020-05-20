import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router'
import {FormLayoutDemo} from './formlayoutdemo';

@NgModule({
	imports: [
		RouterModule.forChild([
			{path:'',component: FormLayoutDemo}
		])
	],
	exports: [
		RouterModule
	]
})
export class FormLayoutDemoRoutingModule {}
