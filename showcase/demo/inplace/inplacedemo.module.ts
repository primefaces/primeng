import {NgModule}     from '@angular/core';
import {CommonModule} from '@angular/common';
import {InplaceDemo} from './inplacedemo';
import {InplaceDemoRoutingModule} from './inplacedemo-routing.module';

@NgModule({
	imports: [
		CommonModule,
		InplaceDemoRoutingModule
	],
	declarations: [
		InplaceDemo
	]
})
export class InplaceDemoModule {}
