import { NgModule }     from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }    from '@angular/forms';
import { TreeTableDemo } from './treetabledemo';
import { TreeTableDemoRoutingModule } from './treetabledemo-routing.module';
import { TreeTableModule } from '../../../components/treetable/treetable';
import { GrowlModule } from '../../../components/growl/growl';
import { TabViewModule } from '../../../components/tabview/tabview';
import { MultiSelectModule } from '../../../components/multiselect/multiselect';
import { ContextMenuModule } from '../../../components/contextmenu/contextmenu';
import { CodeHighlighterModule } from '../../../components/codehighlighter/codehighlighter';
import { TreeTableSubmenu } from './treetablesubmenu';
import { TreeTablePageDemo } from './treetablepagedemo';
import { TreeTableSortDemo } from './treetablesortdemo';
import { TreeTableSelectionDemo } from './treetableselectiondemo';
import { TreeTableSectionsDemo } from './treetablesectionsdemo';
import { TreeTableStyleDemo } from './treetablestyledemo';
import { TreeTableLazyDemo } from './treetablelazydemo';
import { TreeTableColGroupDemo } from './treetablecolgroupdemo';
import { TreeTableScrollDemo } from './treetablescrolldemo';
import { TreeTableColToggleDemo } from './treetablecoltoggledemo';
import { TreeTableResponsiveDemo } from './treetableresponsivedemo';
import { TreeTableContextMenuDemo } from './treetablecontextmenudemo';
import { TreeTableColResizeDemo } from './treetablecolresizedemo';
import { TreeTableReorderDemo } from './treetablereorderdemo';
import { TreeTableEditDemo } from './treetableeditdemo';

@NgModule({
	imports: [
		CommonModule,
        FormsModule,
		TreeTableDemoRoutingModule,
        TreeTableModule,
        GrowlModule,
        TabViewModule,
        MultiSelectModule,
        ContextMenuModule,
        CodeHighlighterModule
	],
	declarations: [
        TreeTableDemo,
        TreeTablePageDemo,
        TreeTableSortDemo,
        TreeTableSelectionDemo,
        TreeTableSectionsDemo,
        TreeTableStyleDemo,
        TreeTableLazyDemo,
        TreeTableColGroupDemo,
        TreeTableScrollDemo,
        TreeTableColToggleDemo,
        TreeTableResponsiveDemo,
        TreeTableContextMenuDemo,
        TreeTableColResizeDemo,
        TreeTableReorderDemo,
        TreeTableEditDemo,
        TreeTableSubmenu
	]
})
export class TreeTableDemoModule {}
