import {NgModule}     from '@angular/core';
import {RouterModule} from '@angular/router'
import {ChipsDemo} from './chipsdemo';

@NgModule({
	imports: [
		RouterModule.forChild([
			{path:'',component: ChipsDemo}
		])
	],
	exports: [
		RouterModule
	]
})
export class ChipsDemoRoutingModule {}
