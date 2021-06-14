import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PanelDemo} from './paneldemo';
import {PanelDemoRoutingModule} from './paneldemo-routing.module';
import {PanelModule} from 'primeng/panel';
import {ToastModule} from 'primeng/toast';
import { MenuModule } from 'primeng/menu';
import {TabViewModule} from 'primeng/tabview';
import {AppCodeModule} from '../../app.code.component';
import {AppDemoActionsModule} from '../../app.demoactions.component';

@NgModule({
	imports: [
		CommonModule,
		PanelDemoRoutingModule,
        PanelModule,
        ToastModule,
		TabViewModule,
		AppCodeModule,
		MenuModule,
		AppDemoActionsModule
	],
	declarations: [
		PanelDemo
	]
})
export class PanelDemoModule {}
