import {NgModule}     from '@angular/core';
import {CommonModule} from '@angular/common';
import {FieldsetDemo} from './fieldsetdemo';
import {FieldsetDemoRoutingModule} from './fieldsetdemo-routing.module';

@NgModule({
	imports: [
		CommonModule,
		FieldsetDemoRoutingModule
	],
	declarations: [
		FieldsetDemo
	]
})
export class FieldsetDemoModule {}
