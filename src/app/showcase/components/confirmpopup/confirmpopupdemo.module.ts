import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ConfirmPopupDemo} from './confirmpopupdemo';
import {ConfirmPopupDemoRoutingModule} from './confirmpopupdemo-routing.module';
import {ConfirmPopupModule} from 'primeng/confirmpopup';
import {ToastModule} from 'primeng/toast';
import {ButtonModule} from 'primeng/button';
import {MessagesModule} from 'primeng/messages';
import {TabViewModule} from 'primeng/tabview';
import {AppCodeModule} from '../../app.code.component';
import {AppDemoActionsModule} from '../../app.demoactions.component';

@NgModule({
	imports: [
		CommonModule,
		ConfirmPopupDemoRoutingModule,
        ConfirmPopupModule,
        ButtonModule,
		MessagesModule,
		ToastModule,
		TabViewModule,
		AppDemoActionsModule,
		AppCodeModule
	],
	declarations: [
		ConfirmPopupDemo
	]
})
export class ConfirmPopupDemoModule {}
