import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule}  from '@angular/forms';
import {MultiSelectDemo} from './multiselectdemo';
import {MultiSelectDemoRoutingModule} from './multiselectdemo-routing.module';
import {MultiSelectModule} from 'primeng/multiselect';
import {TabViewModule} from 'primeng/tabview';
import {CodeHighlighterModule} from 'primeng/codehighlighter';
import { AppInputStyleSwitchModule } from '../../app.inputstyleswitch.component';
import { AppCodeModule } from '../../app.code.component';


@NgModule({
	imports: [
		CommonModule,
        FormsModule,
		MultiSelectDemoRoutingModule,
        MultiSelectModule,
		TabViewModule,
		AppInputStyleSwitchModule,
		AppCodeModule,
        CodeHighlighterModule
	],
	declarations: [
		MultiSelectDemo
	]
})
export class MultiSelectDemoModule {}
