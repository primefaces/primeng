import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {InputTextDemo} from './inputtextdemo';
import {InputTextDemoRoutingModule} from './inputtextdemo-routing.module';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {TabViewModule} from 'primeng/tabview';
import {AppCodeModule} from '../../app.code.component';
import {AppDemoActionsModule} from '../../app.demoactions.component';

@NgModule({
	imports: [
		CommonModule,
		InputTextDemoRoutingModule,
        FormsModule,
        InputTextModule,
        ButtonModule,
		TabViewModule,
		AppDemoActionsModule,
        AppCodeModule
	],
	declarations: [
		InputTextDemo
	]
})
export class InputTextDemoModule {}
