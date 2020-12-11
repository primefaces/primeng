import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router'
import {ChipDemo} from './chipdemo';

@NgModule({
	imports: [
		RouterModule.forChild([
			{path:'',component: ChipDemo}
		])
	],
	exports: [
		RouterModule
	]
})
export class ChipDemoRoutingModule {}
