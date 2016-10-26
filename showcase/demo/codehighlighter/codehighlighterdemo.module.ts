import {NgModule}     from '@angular/core';
import {CommonModule} from '@angular/common';
import {CodeHighlighterDemo} from './codehighlighterdemo';
import {CodeHighlighterDemoRoutingModule} from './codehighlighterdemo-routing.module';

@NgModule({
	imports: [
		CommonModule,
		CodeHighlighterDemoRoutingModule
	],
	declarations: [
		CodeHighlighterDemo
	]
})
export class CodeHighlighterDemoModule {}
