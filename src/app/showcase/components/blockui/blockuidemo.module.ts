import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BlockUIDemo} from './blockuidemo';
import {BlockUIDemoRoutingModule} from './blockuidemo-routing.module';
import {BlockUIModule} from 'primeng/blockui';
import {ButtonModule} from 'primeng/button';
import {PanelModule} from 'primeng/panel';
import {TabViewModule} from 'primeng/tabview';
import {AppCodeModule} from '../../app.code.component';
import {AppDemoActionsModule} from '../../app.demoactions.component';

@NgModule({
	imports: [
		CommonModule,
		BlockUIDemoRoutingModule,
        BlockUIModule,
        ButtonModule,
        PanelModule,
        TabViewModule,
        AppCodeModule,
		AppDemoActionsModule
	],
	declarations: [
		BlockUIDemo
	]
})
export class BlockUIDemoModule {}
