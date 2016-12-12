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
import {DataTableColGroupDemo} from './datatablecolgroupdemo';
import {DataTableRowGroupDemo} from './datatablerowgroupdemo';
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
            {path: 'facets', component: DataTableFacetsDemo},
            {path: 'paginator', component: DataTablePaginatorDemo},
            {path: 'sort', component: DataTableSortDemo},
            {path: 'responsive', component: DataTableResponsiveDemo},
            {path: 'selection', component: DataTableSelectionDemo},
            {path: 'filter', component: DataTableFilterDemo},
            {path: 'editable', component: DataTableEditableDemo},
            {path: 'colresize', component: DataTableColResizeDemo},
            {path: 'colreorder', component: DataTableColReorderDemo},
            {path: 'scroll', component: DataTableScrollDemo},
            {path: 'colgroup', component: DataTableColGroupDemo},
            {path: 'rowgroup', component: DataTableRowGroupDemo},
            {path: 'lazy', component: DataTableLazyDemo},
            {path: 'crud', component: DataTableCrudDemo},
            {path: 'templating', component: DataTableTemplatingDemo},
            {path: 'contextmenu', component: DataTableCMDemo},
            {path: 'coltoggler', component: DataTableColTogglerDemo},
            {path: 'rowexpansion', component: DataTableRowExpansionDemo},
            {path: 'export', component: DataTableExportDemo}
		])
	],
	exports: [
		RouterModule
	]
})
export class DatatableDemoRoutingModule {}
