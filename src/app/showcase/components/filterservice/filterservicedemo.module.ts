import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';;
import { TabViewModule } from 'primeng/tabview';
import { FilterServiceDemo } from './filterservicedemo';
import { FilterServiceDemoRoutingModule } from './filterservice-routing.module';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { AppCodeModule } from '../../app.code.component';
import { AppDemoActionsModule } from '../../app.demoactions.component';

@NgModule({
	imports: [
		CommonModule,
		FilterServiceDemoRoutingModule,
        ButtonModule,
        TabViewModule,
        AppCodeModule,
		AutoCompleteModule,
		FormsModule,
		TableModule,
		InputTextModule,
		AppDemoActionsModule
	],
	declarations: [
		FilterServiceDemo
	]
})
export class FilterServiceDemoModule {}
