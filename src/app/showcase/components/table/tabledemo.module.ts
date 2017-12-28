import {NgModule}     from '@angular/core';
import {CommonModule} from '@angular/common';
import {TableDemo} from './tabledemo';
import {TablePageDemo} from './tablepagedemo';
import {TableSortDemo} from './tablesortdemo';
import {TableSelectionDemo} from './tableselectiondemo';
import {TableSubmenu} from './tablesubmenu';
import {TableDemoRoutingModule} from './tabledemo-routing.module';
import {TableModule} from '../../../components/table/table';

@NgModule({
	imports: [
		CommonModule,
		TableDemoRoutingModule,
		TableModule
	],
	declarations: [
		TableSubmenu,
		TableDemo,
		TablePageDemo,
		TableSortDemo,
		TableSelectionDemo
	]
})
export class TableDemoModule {}
