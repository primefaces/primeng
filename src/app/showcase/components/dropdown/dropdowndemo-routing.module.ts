import {NgModule}     from '@angular/core';
import {RouterModule} from '@angular/router'
import {DropdownDemo} from './dropdowndemo';

@NgModule({
	imports: [
		RouterModule.forChild([
			{path:'',component: DropdownDemo}
		])
	],
	exports: [
		RouterModule
	]
})
export class DropdownDemoRoutingModule {}
