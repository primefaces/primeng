import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule}  from '@angular/forms';
import {MultiSelectDemo} from './multiselectdemo';
import {MultiSelectDemoRoutingModule} from './multiselectdemo-routing.module';
import {MultiSelectModule} from 'primeng/multiselect';
import {TabViewModule} from 'primeng/tabview';
import {AppCodeModule} from '../../app.code.component';
import {AppDemoActionsModule} from '../../app.demoactions.component';


@NgModule({
	imports: [
		CommonModule,
        FormsModule,
		MultiSelectDemoRoutingModule,
        MultiSelectModule,
		TabViewModule,
		AppDemoActionsModule,
		AppCodeModule
	],
	declarations: [
		MultiSelectDemo
	]
})
export class MultiSelectDemoModule {}
