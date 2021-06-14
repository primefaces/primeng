import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ContextMenuDemo} from './contextmenudemo';
import {ContextMenuDemoRoutingModule} from './contextmenudemo-routing.module';
import {ContextMenuModule} from 'primeng/contextmenu';
import {TabViewModule} from 'primeng/tabview';
import {AppCodeModule} from '../../app.code.component';
import {AppDemoActionsModule} from '../../app.demoactions.component';

@NgModule({
	imports: [
		CommonModule,
		ContextMenuDemoRoutingModule,
        ContextMenuModule,
		TabViewModule,
		AppCodeModule,
		AppDemoActionsModule
	],
	declarations: [
		ContextMenuDemo
	]
})
export class ContextMenuDemoModule {}
