import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { InvalidDemo } from './invaliddemo';
import { InvalidDemoRoutingModule } from './invaliddemo-routing.module';

import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { TabViewModule } from 'primeng/tabview';
import { InputTextModule } from 'primeng/inputtext';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CalendarModule } from 'primeng/calendar';
import { ChipsModule } from 'primeng/chips';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { PasswordModule } from 'primeng/password';
import { TreeSelectModule } from 'primeng/treeselect';

import { AppCodeModule } from '../../app.code.component';
import { AppDemoActionsModule } from '../../app.demoactions.component';

@NgModule({
	imports: [
		CommonModule,
		InvalidDemoRoutingModule,
		ButtonModule,
		CascadeSelectModule,
        PanelModule,
		TabViewModule,
		InputTextModule,
		AutoCompleteModule,
		CalendarModule,
		ChipsModule,
		InputMaskModule,
		InputNumberModule,
		DropdownModule,
		MultiSelectModule,
		InputTextareaModule,
        PasswordModule,
        TreeSelectModule,
		FormsModule,
		AppDemoActionsModule,
        AppCodeModule
	],
	declarations: [
		InvalidDemo
	]
})
export class InvalidDemoModule {}
