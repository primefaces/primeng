import {NgModule}     from '@angular/core';
import {RouterModule} from '@angular/router'
import {DataTableDemo} from './datatabledemo';
import {DataTableCMDemo} from './datatablecmdemo';
import {DataTableColReorderDemo} from './datatablecolreorderdemo';
import {DataTableColResizeDemo} from './datatablecolresizedemo';
import {DataTableColTogglerDemo} from './datatablecoltogglerdemo';
import {DataTableCrudDemo} from './datatablecruddemo';
import {DataTableEditableDemo} from './datatableeditabledemo';
import {DataTableExportDemo} from './datatableexportdemo';
import {DataTableFacetsDemo} from './datatablefacetsdemo';
import {DataTableFilterDemo} from './datatablefilterdemo';
import {DataTableGroupDemo} from './datatablegroupdemo';
import {DataTableLazyDemo} from './datatablelazydemo';
import {DataTablePaginatorDemo} from './datatablepaginatordemo';
import {DataTableResponsiveDemo} from './datatableresponsivedemo';
import {DataTableRowExpansionDemo} from './datatablerowexpansiondemo';
import {DataTableScrollDemo} from './datatablescrolldemo';
import {DataTableSelectionDemo} from './datatableselectiondemo';
import {DataTableSortDemo} from './datatablesortdemo';
import {DataTableTemplatingDemo} from './datatabletemplatingdemo';

@NgModule({
	imports: [
		RouterModule.forChild([
			{path: '', component: DataTableDemo},
            {path: 'datatablefacets', component: DataTableFacetsDemo},
            {path: 'datatablepaginator', component: DataTablePaginatorDemo},
            {path: 'datatablesort', component: DataTableSortDemo},
            {path: 'datatableresponsive', component: DataTableResponsiveDemo},
            {path: 'datatableselection', component: DataTableSelectionDemo},
            {path: 'datatablefilter', component: DataTableFilterDemo},
            {path: 'datatableeditable', component: DataTableEditableDemo},
            {path: 'datatablecolresize', component: DataTableColResizeDemo},
            {path: 'datatablecolreorder', component: DataTableColReorderDemo},
            {path: 'datatablescroll', component: DataTableScrollDemo},
            {path: 'datatablegroup', component: DataTableGroupDemo},
            {path: 'datatablelazy', component: DataTableLazyDemo},
            {path: 'datatablecrud', component: DataTableCrudDemo},
            {path: 'datatabletemplating', component: DataTableTemplatingDemo},
            {path: 'datatablecontextmenu', component: DataTableCMDemo},
            {path: 'datatablecoltoggler', component: DataTableColTogglerDemo},
            {path: 'datatablerowexpansion', component: DataTableRowExpansionDemo},
		])
	],
	exports: [
		RouterModule
	]
})
export class DatatableDemoRoutingModule {}
