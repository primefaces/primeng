import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { StyleClassDemoRoutingModule } from './styleclassdemo-routing.module';
import { StyleClassDemo } from './styleclassdemo';
import { StyleClassModule } from 'primeng/styleclass';
import { AppCodeModule } from '../../app.code.component';
import { TabViewModule } from 'primeng/tabview';
import {AppDemoActionsModule} from '../../app.demoactions.component';

@NgModule({
	imports: [
		CommonModule,
		StyleClassDemoRoutingModule,
        FormsModule,
        ButtonModule,
		InputTextModule,
		StyleClassModule,
		AppCodeModule,
		TabViewModule,
		AppDemoActionsModule
	],
	declarations: [
		StyleClassDemo
	]
})
export class StyleClassDemoModule {}
