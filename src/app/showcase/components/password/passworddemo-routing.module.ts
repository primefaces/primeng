import {NgModule}     from '@angular/core';
import {RouterModule} from '@angular/router'
import {PasswordDemo} from './passworddemo';

@NgModule({
	imports: [
		RouterModule.forChild([
			{path:'',component: PasswordDemo}
		])
	],
	exports: [
		RouterModule
	]
})
export class PasswordDemoRoutingModule {}
