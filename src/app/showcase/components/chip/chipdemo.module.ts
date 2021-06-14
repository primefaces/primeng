import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ChipDemo} from './chipdemo';
import {ChipDemoRoutingModule} from './chipdemo-routing.module';
import {ButtonModule} from 'primeng/button';
import {PanelModule} from 'primeng/panel';
import {TabViewModule} from 'primeng/tabview';
import {AppCodeModule} from '../../app.code.component';
import { ChipModule } from 'primeng/chip';
import {AppDemoActionsModule} from '../../app.demoactions.component';

@NgModule({
	imports: [
		CommonModule,
		ChipDemoRoutingModule,
        ButtonModule,
        PanelModule,
		TabViewModule,
		ChipModule,
		AppDemoActionsModule,
		AppCodeModule
	],
	declarations: [
		ChipDemo
	]
})
export class ChipDemoModule {}
