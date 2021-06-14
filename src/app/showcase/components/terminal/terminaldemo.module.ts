import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TerminalDemo} from './terminaldemo';
import {TerminalDemoRoutingModule} from './terminaldemo-routing.module';
import {TerminalModule} from 'primeng/terminal';
import {TabViewModule} from 'primeng/tabview';
import {AppCodeModule} from '../../app.code.component';
import {AppDemoActionsModule} from '../../app.demoactions.component';

@NgModule({
	imports: [
		CommonModule,
		TerminalDemoRoutingModule,
        TerminalModule,
        TabViewModule,
        TabViewModule,
        AppCodeModule,
		AppDemoActionsModule
	],
	declarations: [
		TerminalDemo
	]
})
export class TerminalDemoModule {}
