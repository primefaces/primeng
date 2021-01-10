import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ButtonDemo} from './buttondemo';
import {ButtonDemoRoutingModule} from './buttondemo-routing.module';
import {ButtonModule} from 'primeng/button';
import {TabViewModule} from 'primeng/tabview';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {RippleModule} from 'primeng/ripple';
import {AppCodeModule} from '../../app.code.component';

@NgModule({
	imports: [
		CommonModule,
		ButtonDemoRoutingModule,
        ButtonModule,
        TabViewModule,
		AppCodeModule,
        ProgressSpinnerModule,
        RippleModule
	],
	declarations: [
		ButtonDemo
	]
})
export class ButtonDemoModule {}
