import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router'
import {InputNumberDemo} from './inputnumberdemo';

@NgModule({
	imports: [
		RouterModule.forChild([
			{path:'',component: InputNumberDemo}
		])
	],
	exports: [
		RouterModule
	]
})
export class InputNumberDemoRoutingModule {}
