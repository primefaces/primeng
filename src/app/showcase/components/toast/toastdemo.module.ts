import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ToastDemo} from './toastdemo';
import {ToastDemoRoutingModule} from './toastdemo-routing.module';
import {ToastModule} from 'primeng/toast';
import {ButtonModule} from 'primeng/button';
import {TabViewModule} from 'primeng/tabview';
import {CodeHighlighterModule} from 'primeng/codehighlighter';

@NgModule({
	imports: [
		CommonModule,
		ToastDemoRoutingModule,
        ToastModule,
        ButtonModule,
        TabViewModule,
        CodeHighlighterModule
	],
	declarations: [
		ToastDemo
	]
})
export class ToastDemoModule {}
