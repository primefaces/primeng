import {NgModule}     from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProgressBarDemo} from './progressbardemo';
import {ProgressBarDemoRoutingModule} from './progressbardemo-routing.module';
import {ProgressBarModule} from '../../../components/progressbar/progressbar';
import {ToastModule} from '../../../components/toast/toast';
import {TabViewModule} from '../../../components/tabview/tabview';
import {CodeHighlighterModule} from '../../../components/codehighlighter/codehighlighter';

@NgModule({
	imports: [
		CommonModule,
		ProgressBarDemoRoutingModule,
        ProgressBarModule,
        ToastModule,
        TabViewModule,
        CodeHighlighterModule
	],
	declarations: [
		ProgressBarDemo
	]
})
export class ProgressBarDemoModule {}
