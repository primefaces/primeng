import {NgModule}     from '@angular/core';
import {RouterModule} from '@angular/router'
import {AccordionDemo} from './accordiondemo';

@NgModule({
	imports: [
		RouterModule.forChild([
			{path:'',component: AccordionDemo}
		])
	],
	exports: [
		RouterModule
	]
})
export class AccordionDemoRoutingModule {}
