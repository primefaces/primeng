import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InputTextareaDemo} from './inputtextareademo';
import {InputTextareaDemoRoutingModule} from './inputtextareademo-routing.module';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {TabViewModule} from 'primeng/tabview';
import {CodeHighlighterModule} from 'primeng/codehighlighter';
import {AppInputStyleSwitchModule} from '../../app.inputstyleswitch.component';
import {AppCodeModule} from '../../app.code.component';

@NgModule({
	imports: [
		CommonModule,
		InputTextareaDemoRoutingModule,
        InputTextareaModule,
		TabViewModule,
		AppInputStyleSwitchModule,
		AppCodeModule,
        CodeHighlighterModule
	],
	declarations: [
		InputTextareaDemo
	]
})
export class InputTextareaDemoModule {}
