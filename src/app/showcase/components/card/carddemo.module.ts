import {NgModule}     from '@angular/core';
import {CommonModule} from '@angular/common';
import {CardDemo} from './carddemo';
import {CardDemoRoutingModule} from './carddemo-routing.module';
import {CardModule} from '../../../components/card/card';
import {TabViewModule} from '../../../components/tabview/tabview';
import {ButtonModule} from '../../../components/button/button';
import {CodeHighlighterModule} from '../../../components/codehighlighter/codehighlighter';

@NgModule({
	imports: [
		CommonModule,
		CardDemoRoutingModule,
		CardModule,
		ButtonModule,
        TabViewModule,
        CodeHighlighterModule
	],
	declarations: [
		CardDemo
	]
})
export class CardDemoModule {}
