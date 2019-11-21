import {NgModule}     from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule}  from '@angular/forms';
import {MultiSelectDemo} from './multiselectdemo';
import {MultiSelectDemoRoutingModule} from './multiselectdemo-routing.module';
import {MultiSelectModule} from '../../../components/multiselect/multiselect';
import {TabViewModule} from '../../../components/tabview/tabview';
import {CodeHighlighterModule} from '../../../components/codehighlighter/codehighlighter';


@NgModule({
	imports: [
		CommonModule,
        FormsModule,
		MultiSelectDemoRoutingModule,
        MultiSelectModule,
        TabViewModule,
        CodeHighlighterModule
	],
	declarations: [
		MultiSelectDemo
	]
})
export class MultiSelectDemoModule {}
