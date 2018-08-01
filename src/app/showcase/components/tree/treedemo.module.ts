import {NgModule}     from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule}  from '@angular/forms';
import {TreeDemo} from './treedemo';
import {TreeDemoRoutingModule} from './treedemo-routing.module';
import {TreeModule} from '../../../components/tree/tree';
import {ToastModule} from '../../../components/toast/toast';
import {ButtonModule} from '../../../components/button/button';
import {ContextMenuModule} from '../../../components/contextmenu/contextmenu';
import {TabViewModule} from '../../../components/tabview/tabview';
import {CodeHighlighterModule} from '../../../components/codehighlighter/codehighlighter';

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
		TreeDemo
	]
})
export class TreeDemoModule {}
