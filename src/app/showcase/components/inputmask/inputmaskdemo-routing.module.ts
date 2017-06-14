import {NgModule}     from '@angular/core';
import {RouterModule} from '@angular/router'
import {InputMaskDemo} from './inputmaskdemo';

@NgModule({
	imports: [
		RouterModule.forChild([
			{path:'',component: InputMaskDemo}
		])
	],
	exports: [
		RouterModule
	]
})
export class InputMaskDemoRoutingModule {}
