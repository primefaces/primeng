import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {FormLayoutDemo} from './formlayoutdemo';
import {FormLayoutDemoRoutingModule} from './formlayout-routing.module';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {CheckboxModule} from 'primeng/checkbox';
import {RadioButtonModule} from 'primeng/radiobutton';
import {DropdownModule} from 'primeng/dropdown';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {TabViewModule} from 'primeng/tabview';
import {CodeHighlighterModule} from 'primeng/codehighlighter';

@NgModule({
	imports: [
		CommonModule,
		FormLayoutDemoRoutingModule,
		InputTextModule,
		CheckboxModule,
		ButtonModule,
        TabViewModule,
		CodeHighlighterModule,
		RadioButtonModule,
		InputTextareaModule,
		DropdownModule,
		FormsModule
	],
	declarations: [
		FormLayoutDemo
	]
})
export class FormLayoutDemoModule {}
