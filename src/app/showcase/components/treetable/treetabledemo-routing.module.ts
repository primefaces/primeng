import { NgModule}     from '@angular/core';
import { RouterModule } from '@angular/router'
import { TreeTableDemo } from './treetabledemo';
import { TreeTablePageDemo } from './treetablepagedemo';
import { TreeTableSortDemo } from './treetablesortdemo';
import { TreeTableSelectionDemo } from './treetableselectiondemo';
import { TreeTableTemplatingDemo } from './treetabletemplatingdemo';
import { TreeTableStyleDemo } from './treetablestyledemo';
import { TreeTableLazyDemo } from './treetablelazydemo';
import { TreeTableColGroupDemo } from './treetablecolgroupdemo';
import { TreeTableScrollDemo } from './treetablescrolldemo';
import { TreeTableFlexScrollDemo } from './treetableflexscrolldemo';
import { TreeTableColToggleDemo } from './treetablecoltoggledemo';
import { TreeTableResponsiveDemo } from './treetableresponsivedemo';
import { TreeTableContextMenuDemo } from './treetablecontextmenudemo';
import { TreeTableColResizeDemo } from './treetablecolresizedemo';
import { TreeTableReorderDemo } from './treetablereorderdemo';
import { TreeTableEditDemo } from './treetableeditdemo';
import { TreeTableFilterDemo } from './treetablefilterdemo';
import { TreeTableSizeDemo } from './treetablesizedemo';

@NgModule({
	imports: [
		RouterModule.forChild([
            {path:'',component: TreeTableDemo},
            { path: 'page', component: TreeTablePageDemo },
			{ path: 'sort', component: TreeTableSortDemo },
			{ path: 'selection', component: TreeTableSelectionDemo },
			{ path: 'templating', component: TreeTableTemplatingDemo },
			{ path: 'style', component: TreeTableStyleDemo },
			{ path: 'lazy', component: TreeTableLazyDemo },
			{ path: 'colgroup', component: TreeTableColGroupDemo },
            { path: 'scroll', component: TreeTableScrollDemo },
            { path: 'flexscroll', component: TreeTableFlexScrollDemo },
			{ path: 'coltoggle', component: TreeTableColToggleDemo },
			{ path: 'responsive', component: TreeTableResponsiveDemo },
			{ path: 'contextmenu', component: TreeTableContextMenuDemo },
			{ path: 'colresize', component: TreeTableColResizeDemo },
			{ path: 'reorder', component: TreeTableReorderDemo },
			{ path: 'edit', component: TreeTableEditDemo },
			{ path: 'filter', component: TreeTableFilterDemo },
			{ path: 'size', component: TreeTableSizeDemo }
		])
	],
	exports: [
		RouterModule
	]
})
export class TreeTableDemoRoutingModule {}
