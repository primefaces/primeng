import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router'
import {InputSwitchDemo} from './inputswitchdemo';

@NgModule({
	imports: [
		RouterModule.forChild([
			{path:'',component: InputSwitchDemo}
		])
	],
	exports: [
		RouterModule
	]
})
export class InputSwitchDemoRoutingModule {}
