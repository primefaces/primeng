import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {DropdownDemo} from './dropdowndemo';
import {DropdownDemoRoutingModule} from './dropdowndemo-routing.module';
import {DropdownModule} from 'primeng/dropdown';
import {TabViewModule} from 'primeng/tabview';
import {AppCodeModule} from '../../app.code.component';
import {AppDemoActionsModule} from '../../app.demoactions.component';
import { SkeletonModule } from 'primeng/skeleton';

@NgModule({
	imports: [
		CommonModule,
        FormsModule,
		DropdownDemoRoutingModule,
        DropdownModule,
		TabViewModule,
        SkeletonModule,
		AppDemoActionsModule,
		AppCodeModule
	],
	declarations: [
		DropdownDemo
	]
})
export class DropdownDemoModule {}
