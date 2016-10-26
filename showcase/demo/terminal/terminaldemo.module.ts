import {NgModule}     from '@angular/core';
import {CommonModule} from '@angular/common';
import {TerminalDemo} from './terminaldemo';
import {TerminalDemoRoutingModule} from './terminaldemo-routing.module';

@NgModule({
	imports: [
		CommonModule,
		TerminalDemoRoutingModule
	],
	declarations: [
		TerminalDemo
	]
})
export class TerminalDemoModule {}
