import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TooltipDemo} from './tooltipdemo';
import {TooltipDemoRoutingModule} from './tooltipdemo-routing.module';
import {TooltipModule} from 'primeng/tooltip';
import {InputTextModule} from 'primeng/inputtext';
import {TabViewModule} from 'primeng/tabview';
import {AppCodeModule} from '../../app.code.component';
import {ButtonModule} from 'primeng/button';
import {RippleModule} from 'primeng/ripple';

@NgModule({
	imports: [
		CommonModule,
		TooltipDemoRoutingModule,
        TooltipModule,
        InputTextModule,
		TabViewModule,
		AppCodeModule,
		ButtonModule,
		RippleModule
	],
	declarations: [
		TooltipDemo
	]
})
export class TooltipDemoModule {}
