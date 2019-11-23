import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router'
import {InputTextareaDemo} from './inputtextareademo';

@NgModule({
	imports: [
		RouterModule.forChild([
			{path:'',component: InputTextareaDemo}
		])
	],
	exports: [
		RouterModule
	]
})
export class InputTextareaDemoRoutingModule {}
