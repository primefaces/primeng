import {NgModule}     from '@angular/core';
import {CommonModule} from '@angular/common';
import {InputMaskDemo} from './inputmaskdemo';
import {InputMaskDemoRoutingModule} from './inputmaskdemo-routing.module';

@NgModule({
	imports: [
		CommonModule,
		InputMaskDemoRoutingModule
	],
	declarations: [
		InputMaskDemo
	]
})
export class InputMaskDemoModule {}
