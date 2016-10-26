import {NgModule}     from '@angular/core';
import {CommonModule} from '@angular/common';
import {AutoCompleteDemo} from './autocompletedemo';
import {AutoCompleteDemoRoutingModule} from './autocompletedemo-routing.module';

@NgModule({
	imports: [
		CommonModule,
		AutoCompleteDemoRoutingModule
	],
	declarations: [
		AutoCompleteDemo
	]
})
export class AutoCompleteDemoModule {}
