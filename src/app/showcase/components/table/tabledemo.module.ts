import {NgModule}     from '@angular/core';
import {CommonModule} from '@angular/common';
import {TableDemo} from './tabledemo';
import {TableDemoRoutingModule} from './tabledemo-routing.module';
import {TableModule} from '../../../components/table/table';

@NgModule({
	imports: [
		CommonModule,
		TableDemoRoutingModule,
		TableModule
	],
	declarations: [
		TableDemo
	]
})
export class TableDemoModule {}
