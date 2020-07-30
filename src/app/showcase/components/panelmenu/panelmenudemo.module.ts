import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PanelMenuDemo} from './panelmenudemo';
import {PanelMenuDemoRoutingModule} from './panelmenudemo-routing.module';
import {PanelMenuModule} from 'primeng/panelmenu';
import {TabViewModule} from 'primeng/tabview';
import {AppCodeModule} from '../../app.code.component';

@NgModule({
	imports: [
		CommonModule,
		PanelMenuDemoRoutingModule,
        PanelMenuModule,
		TabViewModule,
		AppCodeModule
	],
	declarations: [
		PanelMenuDemo
	]
})
export class PanelMenuDemoModule {}
