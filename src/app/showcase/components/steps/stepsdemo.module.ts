import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StepsDemo} from './stepsdemo';
import {StepsDemoRoutingModule} from './stepsdemo-routing.module';
import {StepsModule} from 'primeng/steps';
import {ToastModule} from 'primeng/toast';
import {TabViewModule} from 'primeng/tabview';
import {CodeHighlighterModule} from 'primeng/codehighlighter';

@NgModule({
	imports: [
		CommonModule,
		StepsDemoRoutingModule,
        StepsModule,
        ToastModule,
        TabViewModule,
        CodeHighlighterModule
	],
	declarations: [
		StepsDemo
	]
})
export class StepsDemoModule {}
