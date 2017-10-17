import {NgModule}     from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProgressSpinnerDemo} from './progressspinnerdemo';
import {ProgressSpinnerDemoRoutingModule} from './progressspinnerdemo-routing.module';
import {ProgressSpinnerModule} from '../../../components/progressspinner/progressspinner';
import {TabViewModule} from '../../../components/tabview/tabview';
import {CodeHighlighterModule} from '../../../components/codehighlighter/codehighlighter';

@NgModule({
	imports: [
		CommonModule,
		ProgressSpinnerDemoRoutingModule,
        ProgressSpinnerModule,
        TabViewModule,
        CodeHighlighterModule
	],
	declarations: [
		ProgressSpinnerDemo
	]
})
export class ProgressSpinnerDemoModule {}
