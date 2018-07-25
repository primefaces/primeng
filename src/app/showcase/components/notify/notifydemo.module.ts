import {NgModule}     from '@angular/core';
import {CommonModule} from '@angular/common';
import {NotifyDemo} from './notifydemo';
import {NotifyDemoRoutingModule} from './notifydemo-routing.module';
import {NotifyModule} from '../../../components/notify/notify';
import {ButtonModule} from '../../../components/button/button';
import {TabViewModule} from '../../../components/tabview/tabview';
import {CodeHighlighterModule} from '../../../components/codehighlighter/codehighlighter';

@NgModule({
	imports: [
		CommonModule,
		NotifyDemoRoutingModule,
        NotifyModule,
        ButtonModule,
        TabViewModule,
        CodeHighlighterModule
	],
	declarations: [
		NotifyDemo
	]
})
export class NotifyDemoModule {}
