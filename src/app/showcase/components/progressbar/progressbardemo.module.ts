import {NgModule}     from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProgressBarDemo} from './progressbardemo';
import {ProgressBarDemoRoutingModule} from './progressbardemo-routing.module';
import {ProgressBarModule} from '../../../components/progressbar/progressbar';
import {GrowlModule} from '../../../components/growl/growl';
import {TabViewModule} from '../../../components/tabview/tabview';
import {CodeHighlighterModule} from '../../../components/codehighlighter/codehighlighter';

@NgModule({
	imports: [
		CommonModule,
		ProgressBarDemoRoutingModule,
        ProgressBarModule,
        GrowlModule,
        TabViewModule,
        CodeHighlighterModule
	],
	declarations: [
		ProgressBarDemo
	]
})
export class ProgressBarDemoModule {}
