import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router'
import {TreeDemo} from './treedemo';
import {TreeTemplatingDemo} from './treetemplatingdemo';
import {TreeSelectionDemo} from './treeselectiondemo';
import {TreeFilterDemo} from './treefilterdemo';
import {TreeLazyDemo} from './treelazydemo';
import {TreeScrollDemo} from './treescrolldemo';
import {TreeContextMenuDemo} from './treecontextmenudemo';
import {TreeDragDropDemo} from './treedragdropdemo';
import {TreeHorizontalDemo} from './treehorizontaldemo';

@NgModule({
	imports: [
		RouterModule.forChild([
            {path:'',component: TreeDemo},
            {path:'templating',component: TreeTemplatingDemo},
            {path:'selection',component: TreeSelectionDemo},
            {path:'filter',component: TreeFilterDemo},
            {path:'lazy',component: TreeLazyDemo},
            {path:'scroll',component: TreeScrollDemo},
            {path:'contextmenu',component: TreeContextMenuDemo},
            {path:'dragdrop',component: TreeDragDropDemo},
            {path:'horizontal',component: TreeHorizontalDemo}
		])
	],
	exports: [
		RouterModule
	]
})
export class TreeDemoRoutingModule {}
