import {NgModule}     from '@angular/core';
import {RouterModule} from '@angular/router'
import {FieldsetDemo} from './fieldsetdemo';

@NgModule({
	imports: [
		RouterModule.forChild([
			{path:'',component: FieldsetDemo}
		])
	],
	exports: [
		RouterModule
	]
})
export class FieldsetDemoRoutingModule {}
