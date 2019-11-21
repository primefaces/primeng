import {NgModule}     from '@angular/core';
import {CommonModule} from '@angular/common';
import {CodeHighlighterDemo} from './codehighlighterdemo';
import {CodeHighlighterDemoRoutingModule} from './codehighlighterdemo-routing.module';
import {CodeHighlighterModule} from '../../../components/codehighlighter/codehighlighter';
import {TabViewModule} from '../../../components/tabview/tabview';

@NgModule({
	imports: [
		CommonModule,
		CodeHighlighterDemoRoutingModule,
        TabViewModule,
        CodeHighlighterModule
	],
	declarations: [
		CodeHighlighterDemo
	]
})
export class CodeHighlighterDemoModule {}
