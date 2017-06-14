import {NgModule}     from '@angular/core';
import {RouterModule} from '@angular/router'
import {TooltipDemo} from './tooltipdemo';

@NgModule({
	imports: [
		RouterModule.forChild([
			{path:'',component: TooltipDemo}
		])
	],
	exports: [
		RouterModule
	]
})
export class TooltipDemoRoutingModule {}
