import {NgModule}     from '@angular/core';
import {CommonModule} from '@angular/common';
import {StepsDemo} from './stepsdemo';
import {StepsDemoRoutingModule} from './stepsdemo-routing.module';
import {StepsModule} from '../../../components/steps/steps';
import {GrowlModule} from '../../../components/growl/growl';
import {TabViewModule} from '../../../components/tabview/tabview';
import {CodeHighlighterModule} from '../../../components/codehighlighter/codehighlighter';

@NgModule({
	imports: [
		CommonModule,
		StepsDemoRoutingModule,
        StepsModule,
        GrowlModule,
        TabViewModule,
        CodeHighlighterModule
	],
	declarations: [
		StepsDemo
	]
})
export class StepsDemoModule {}
