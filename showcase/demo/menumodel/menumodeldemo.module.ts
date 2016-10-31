import {NgModule}     from '@angular/core';
import {CommonModule} from '@angular/common';
import {MenuModelDemo} from './menumodeldemo';
import {MenuModelDemoRoutingModule} from './menumodeldemo-routing.module';
import {CodeHighlighterModule} from '../../../components/codehighlighter/codehighlighter';

@NgModule({
	imports: [
		CommonModule,
		MenuModelDemoRoutingModule,
        CodeHighlighterModule
	],
	declarations: [
		MenuModelDemo
	]
})
export class MenuModelDemoModule {}
