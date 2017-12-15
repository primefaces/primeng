import {NgModule}     from '@angular/core';
import {CommonModule} from '@angular/common';
import {KeyFilterDemo} from './keyfilterdemo';
import {KeyFilterDemoRoutingModule} from './keyfilterdemo-routing.module';
import {KeyFilterModule} from '../../../components/keyfilter/keyfilter';
import {InputTextModule} from '../../../components/inputtext/inputtext';
import {TabViewModule} from '../../../components/tabview/tabview';
import {CodeHighlighterModule} from '../../../components/codehighlighter/codehighlighter';

@NgModule({
	imports: [
		CommonModule,
		KeyFilterDemoRoutingModule,
		KeyFilterModule,
        InputTextModule,
        TabViewModule,
        CodeHighlighterModule
	],
	declarations: [
		KeyFilterDemo
	]
})
export class KeyFilterDemoModule {}
