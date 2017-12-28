import { NgModule }     from '@angular/core';
import { RouterModule } from '@angular/router'
import { TableDemo } from './tabledemo';
import { TablePageDemo } from './tablepagedemo';
import { TableSortDemo } from './tablesortdemo';
import { TableSelectionDemo } from './tableselectiondemo';

@NgModule({
	imports: [
		RouterModule.forChild([
			{ path: '', component: TableDemo },
			{ path: 'page', component: TablePageDemo },
			{ path: 'sort', component: TableSortDemo },
			{ path: 'selection', component: TableSelectionDemo }
		])
	],
	exports: [
		RouterModule
	]
})
export class TableDemoRoutingModule {}
