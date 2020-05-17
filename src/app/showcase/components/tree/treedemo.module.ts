import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule}  from '@angular/forms';
import {TreeDemo} from './treedemo';
import {TreeTemplatingDemo} from './treetemplatingdemo';
import {TreeSelectionDemo} from './treeselectiondemo';
import {TreeFilterDemo} from './treefilterdemo';
import {TreeScrollDemo} from './treescrolldemo';
import {TreeLazyDemo} from './treelazydemo';
import {TreeContextMenuDemo} from './treecontextmenudemo';
import {TreeDragDropDemo} from './treedragdropdemo';
import {TreeHorizontalDemo} from './treehorizontaldemo';
import {TreeSubmenu} from './treesubmenu';
import {TreeDemoRoutingModule} from './treedemo-routing.module';
import {TreeModule} from 'primeng/tree';
import {ToastModule} from 'primeng/toast';
import {ButtonModule} from 'primeng/button';
import {ContextMenuModule} from 'primeng/contextmenu';
import {TabViewModule} from 'primeng/tabview';
import {CodeHighlighterModule} from 'primeng/codehighlighter';

@NgModule({
	imports: [
		CommonModule,
        FormsModule,
		TreeDemoRoutingModule,
        TreeModule,
        ToastModule,
        ButtonModule,
        ContextMenuModule,
        TabViewModule,
        CodeHighlighterModule
	],
	declarations: [
        TreeDemo,
        TreeTemplatingDemo,
        TreeSelectionDemo,
        TreeFilterDemo,
        TreeLazyDemo,
        TreeScrollDemo,
        TreeContextMenuDemo,
        TreeDragDropDemo,
        TreeHorizontalDemo,
        TreeSubmenu
	]
})
export class TreeDemoModule {}
