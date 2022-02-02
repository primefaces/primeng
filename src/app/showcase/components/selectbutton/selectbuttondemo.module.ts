import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {SelectButtonDemo} from './selectbuttondemo';
import {SelectButtonDemoRoutingModule} from './selectbuttondemo-routing.module';
import {SelectButtonModule} from 'primeng/selectbutton';
import {ButtonModule} from 'primeng/button';
import {TabViewModule} from 'primeng/tabview';
import {AppCodeModule} from '../../app.code.component';
import {AppDemoActionsModule} from '../../app.demoactions.component';

@NgModule({
	imports: [
		CommonModule,
		SelectButtonDemoRoutingModule,
        FormsModule,
        SelectButtonModule,
        ButtonModule,
		TabViewModule,
		AppCodeModule,
		AppDemoActionsModule
	],
	declarations: [
		SelectButtonDemo
	]
})
export class SelectButtonDemoModule {}
