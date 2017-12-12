import {NgModule}     from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule}    from '@angular/forms';
import {TreeTableDemo} from './treetabledemo';
import {TreeTableDemoRoutingModule} from './treetabledemo-routing.module';
import {TreeTableModule} from '../../../components/treetable/treetable';
import {GrowlModule} from '../../../components/growl/growl';
import {TabViewModule} from '../../../components/tabview/tabview';
import {ContextMenuModule} from '../../../components/contextmenu/contextmenu';
import {CodeHighlighterModule} from '../../../components/codehighlighter/codehighlighter';

@NgModule({
	imports: [
		CommonModule,
        FormsModule,
		TreeTableDemoRoutingModule,
        TreeTableModule,
        GrowlModule,
        TabViewModule,
        ContextMenuModule,
        CodeHighlighterModule
	],
	declarations: [
		TreeTableDemo
	]
})
export class TreeTableDemoModule {}
