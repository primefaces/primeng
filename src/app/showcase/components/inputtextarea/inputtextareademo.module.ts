import {NgModule}     from '@angular/core';
import {CommonModule} from '@angular/common';
import {InputTextareaDemo} from './inputtextareademo';
import {InputTextareaDemoRoutingModule} from './inputtextareademo-routing.module';
import {InputTextareaModule} from '../../../components/inputtextarea/inputtextarea';
import {TabViewModule} from '../../../components/tabview/tabview';
import {CodeHighlighterModule} from '../../../components/codehighlighter/codehighlighter';

@NgModule({
	imports: [
		CommonModule,
		InputTextareaDemoRoutingModule,
        InputTextareaModule,
        TabViewModule,
        CodeHighlighterModule
	],
	declarations: [
		InputTextareaDemo
	]
})
export class InputTextareaDemoModule {}
