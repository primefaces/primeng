import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CardDemo} from './carddemo';
import {CardDemoRoutingModule} from './carddemo-routing.module';
import {CardModule} from 'primeng/card';
import {TabViewModule} from 'primeng/tabview';
import {ButtonModule} from 'primeng/button';
import {AppCodeModule} from '../../app.code.component';
import {AppDemoActionsModule} from '../../app.demoactions.component';

@NgModule({
	imports: [
		CommonModule,
		CardDemoRoutingModule,
		CardModule,
		ButtonModule,
		TabViewModule,
		AppCodeModule,
		AppDemoActionsModule
	],
	declarations: [
		CardDemo
	]
})
export class CardDemoModule {}
