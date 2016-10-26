import {NgModule}     from '@angular/core';
import {CommonModule} from '@angular/common';
import {InputTextDemo} from './inputtextdemo';
import {InputTextDemoRoutingModule} from './inputtextdemo-routing.module';

@NgModule({
	imports: [
		CommonModule,
		InputTextDemoRoutingModule
	],
	declarations: [
		InputTextDemo
	]
})
export class InputTextDemoModule {}
