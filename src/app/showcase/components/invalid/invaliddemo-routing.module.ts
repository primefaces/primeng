import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router'
import { InvalidDemo } from './invaliddemo';

@NgModule({
	imports: [
		RouterModule.forChild([
			{path:'', component: InvalidDemo}
		])
	],
	exports: [
		RouterModule
	]
})
export class InvalidDemoRoutingModule {}
