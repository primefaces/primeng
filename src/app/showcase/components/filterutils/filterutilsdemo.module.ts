import {NgModule}     from '@angular/core';
import {CommonModule} from '@angular/common';
import { FormsModule } from '@angular/forms';
import {ButtonModule} from '../../../components/button/button';;
import {TabViewModule} from '../../../components/tabview/tabview';
import {CodeHighlighterModule} from '../../../components/codehighlighter/codehighlighter';
import { FilterUtilsDemo } from './filterutilsdemo';
import { FilterUtilsDemoRoutingModule } from './filterutils-routing.module';
import { AutoCompleteModule } from '../../../components/autocomplete/autocomplete';
import { TableModule } from '../../../components/table/table';
import { InputTextModule } from 'src/app/components/inputtext/inputtext';

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
