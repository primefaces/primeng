import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SplitterDemo} from './splitterdemo';
import {SplitterDemoRoutingModule} from './splitterdemo-routing.module';
import {ButtonModule} from 'primeng/button';
import {PanelModule} from 'primeng/panel';
import {TabViewModule} from 'primeng/tabview';
import {AppCodeModule} from '../../app.code.component';
import { SplitterModule } from 'primeng/splitter';
import { AppDemoActionsModule } from '../../app.demoactions.component';

@NgModule({
	imports: [
		CommonModule,
		SplitterDemoRoutingModule,
        ButtonModule,
        PanelModule,
		TabViewModule,
		SplitterModule,
		AppCodeModule,
		AppDemoActionsModule
	],
	declarations: [
		SplitterDemo
	]
})
export class SplitterDemoModule {}
