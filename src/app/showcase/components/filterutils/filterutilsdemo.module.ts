import { NgModule }     from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';;
import { TabViewModule } from 'primeng/tabview';
import { CodeHighlighterModule } from 'primeng/codehighlighter';
import { FilterUtilsDemo } from './filterutilsdemo';
import { FilterUtilsDemoRoutingModule } from './filterutils-routing.module';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
	imports: [
		CommonModule,
		FilterUtilsDemoRoutingModule,
        ButtonModule,
        TabViewModule,
		CodeHighlighterModule,
		AutoCompleteModule,
		FormsModule,
		TableModule,
		InputTextModule
	],
	declarations: [
		FilterUtilsDemo
	]
})
export class FilterUtilsDemoModule {}
