import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { FloatLabelDemo } from './floatlabeldemo';
import { FloatLabelDemoRoutingModule } from './floatlabeldemo-routing.module';

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

import {AppCodeModule} from '../../app.code.component';
import {AppDemoActionsModule} from '../../app.demoactions.component';
import { PasswordModule } from 'primeng/password';

@NgModule({
	imports: [
		CommonModule,
		FloatLabelDemoRoutingModule,
        ButtonModule,
        PanelModule,
		TabViewModule,
		InputTextModule,
		AutoCompleteModule,
		CalendarModule,
		CascadeSelectModule,
		ChipsModule,
		InputMaskModule,
		InputNumberModule,
		DropdownModule,
		MultiSelectModule,
		InputTextareaModule,
		FormsModule,
		AppDemoActionsModule,
        AppCodeModule,
		PasswordModule
	],
	declarations: [
		FloatLabelDemo
	]
})
export class FloatLabelDemoModule {}
