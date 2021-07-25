import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TabMenuDemo} from './tabmenudemo';
import {TabMenuDemoRoutingModule} from './tabmenudemo-routing.module';
import {TabMenuModule} from 'primeng/tabmenu';
import {TabViewModule} from 'primeng/tabview';
import {AppCodeModule} from '../../app.code.component';
import {AppDemoActionsModule} from '../../app.demoactions.component';
import { TabMenuDemoCalendar, TabMenuDemoDocumentation, TabMenuDemoEdit, TabMenuDemoHome, TabMenuDemoSettings } from './tabmenudemo-children.component';

@NgModule({
	imports: [
		CommonModule,
		TabMenuDemoRoutingModule,
        TabMenuModule,
		TabViewModule,
		AppCodeModule,
		AppDemoActionsModule
	],
	declarations: [
		TabMenuDemo,
    TabMenuDemoHome,
    TabMenuDemoCalendar,
    TabMenuDemoEdit,
    TabMenuDemoDocumentation,
    TabMenuDemoSettings
	]
})
export class TabMenuDemoModule {}
