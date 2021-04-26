import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ScrollTopDemo} from './scrolltopdemo';
import {ScrollTopDemoRoutingModule} from './scrolltopdemo-routing.module';
import {ButtonModule} from 'primeng/button';
import {PanelModule} from 'primeng/panel';
import {TabViewModule} from 'primeng/tabview';
import {AppCodeModule} from '../../app.code.component';
import {TableModule} from 'primeng/table';
import {ScrollTopModule} from 'primeng/scrolltop';
import {ScrollPanelModule} from 'primeng/scrollpanel';
import {AppDemoActionsModule} from '../../app.demoactions.component';

@NgModule({
	imports: [
		CommonModule,
		ScrollTopDemoRoutingModule,
        ButtonModule,
        PanelModule,
		TabViewModule,
		ScrollTopModule,
		ScrollPanelModule,
		TableModule,
		AppDemoActionsModule,
		AppCodeModule
	],
	declarations: [
		ScrollTopDemo
	]
})
export class ScrollTopDemoModule {}
