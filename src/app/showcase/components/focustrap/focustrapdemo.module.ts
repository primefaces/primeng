import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { AccordionModule } from 'primeng/accordion';
import { TabViewModule } from 'primeng/tabview';
import { FocusTrapDemoRoutingModule } from './focustrapdemo-routing.module';
import { FocusTrapDemo } from './focustrapdemo';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CalendarModule } from 'primeng/calendar';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { EditorModule } from 'primeng/editor';
import { FocusTrapModule } from 'primeng/focustrap';
import { AppCodeModule } from '../../app.code.component';

@NgModule({
	imports: [
		CommonModule,
		FocusTrapDemoRoutingModule,
        FormsModule,
        DialogModule,
        ButtonModule,
        InputTextModule,
        AccordionModule,
        TabViewModule,
        AppCodeModule,
        FocusTrapModule,
		AutoCompleteModule,
		CalendarModule,
		MultiSelectModule,
		DropdownModule,
		EditorModule
	],
	declarations: [
		FocusTrapDemo
	]
})
export class FocusTrapDemoModule {}
