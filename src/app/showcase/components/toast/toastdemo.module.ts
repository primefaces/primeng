import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ToastDemo} from './toastdemo';
import {ToastDemoRoutingModule} from './toastdemo-routing.module';
import {ToastModule} from 'primeng/toast';
import {ButtonModule} from 'primeng/button';
import {TabViewModule} from 'primeng/tabview';
import {RippleModule} from 'primeng/ripple';
import {AppCodeModule} from '../../app.code.component';

@NgModule({
	imports: [
		CommonModule,
		ToastDemoRoutingModule,
        ToastModule,
        ButtonModule,
        TabViewModule,
        RippleModule,
        AppCodeModule
	],
	declarations: [
		ToastDemo
	]
})
export class ToastDemoModule {}
