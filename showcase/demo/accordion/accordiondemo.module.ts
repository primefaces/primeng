import {NgModule}     from '@angular/core';
import {CommonModule} from '@angular/common';
import {AccordionDemo} from './accordiondemo';
import {AccordionDemoRoutingModule} from './accordiondemo-routing.module';

@NgModule({
	imports: [
		CommonModule,
		AccordionDemoRoutingModule
	],
	declarations: [
		AccordionDemo
	]
})
export class AccordionDemoModule {}
