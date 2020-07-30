import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ConfirmDialogDemo} from './confirmdialogdemo';
import {ConfirmDialogDemoRoutingModule} from './confirmdialogdemo-routing.module';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ButtonModule} from 'primeng/button';
import {MessagesModule} from 'primeng/messages';
import {TabViewModule} from 'primeng/tabview';
import {AppCodeModule} from '../../app.code.component';

@NgModule({
	imports: [
		CommonModule,
		ConfirmDialogDemoRoutingModule,
        ConfirmDialogModule,
        ButtonModule,
        MessagesModule,
		TabViewModule,
		AppCodeModule
	],
	declarations: [
		ConfirmDialogDemo
	]
})
export class ConfirmDialogDemoModule {}
