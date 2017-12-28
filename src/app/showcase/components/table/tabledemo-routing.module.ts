import { NgModule }     from '@angular/core';
import { RouterModule } from '@angular/router'
import { TableDemo } from './tabledemo';
import { TablePageDemo } from './tablepagedemo';
import { TableSortDemo } from './tablesortdemo';
import { TableFilterDemo } from './tablefilterdemo';
import { TableSelectionDemo } from './tableselectiondemo';
import { TableSectionsDemo } from './tablesectionsdemo';
import { TableStyleDemo } from './tablestyledemo';

@NgModule({
	imports: [
		RouterModule.forChild([
			{ path: '', component: TableDemo },
			{ path: 'page', component: TablePageDemo },
			{ path: 'sort', component: TableSortDemo },
			{ path: 'selection', component: TableSelectionDemo },
			{ path: 'filter', component: TableFilterDemo },
			{ path: 'sections', component: TableSectionsDemo },
			{ path: 'style', component: TableStyleDemo }
		])
	],
	exports: [
		RouterModule
	]
})
export class TableDemoRoutingModule {}
