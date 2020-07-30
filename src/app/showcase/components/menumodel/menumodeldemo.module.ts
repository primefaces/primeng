import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MenuModelDemo} from './menumodeldemo';
import {MenuModelDemoRoutingModule} from './menumodeldemo-routing.module';
import {CodeHighlighterModule} from 'primeng/codehighlighter';
import {AppCodeModule} from '../../app.code.component';

@NgModule({
	imports: [
		CommonModule,
		MenuModelDemoRoutingModule,
		AppCodeModule,
        CodeHighlighterModule
	],
	declarations: [
		MenuModelDemo
	]
})
export class MenuModelDemoModule {}
