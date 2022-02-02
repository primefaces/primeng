import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RippleDemo} from './rippledemo';
import {RippleDemoRoutingModule} from './rippledemo-routing.module';
import {RippleModule} from 'primeng/ripple';
import {TabViewModule} from 'primeng/tabview';
import {AppCodeModule} from '../../app.code.component';
import {AppDemoActionsModule} from '../../app.demoactions.component';

@NgModule({
	imports: [
		CommonModule,
		RippleDemoRoutingModule,
        RippleModule,
		TabViewModule,
		AppCodeModule,
		AppDemoActionsModule
	],
	declarations: [
		RippleDemo
	]
})
export class RippleDemoModule {}
