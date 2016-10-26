import {NgModule}     from '@angular/core';
import {CommonModule} from '@angular/common';
import {InputSwitchDemo} from './inputswitchdemo';
import {InputSwitchDemoRoutingModule} from './inputswitchdemo-routing.module';

@NgModule({
	imports: [
		CommonModule,
		InputSwitchDemoRoutingModule
	],
	declarations: [
		InputSwitchDemo
	]
})
export class InputswitchDemoModule {}
