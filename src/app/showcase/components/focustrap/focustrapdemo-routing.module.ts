import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router'
import {FocusTrapDemo} from './focustrapdemo';

@NgModule({
	imports: [
		RouterModule.forChild([
			{path:'',component: FocusTrapDemo}
		])
	],
	exports: [
		RouterModule
	]
})
export class FocusTrapDemoRoutingModule {}
