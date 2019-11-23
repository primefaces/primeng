import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SplitButtonDemo} from './splitbuttondemo';
import {SplitButtonDemoRoutingModule} from './splitbuttondemo-routing.module';
import {SplitButtonModule} from 'primeng/splitbutton';
import {ToastModule} from 'primeng/toast';
import {TabViewModule} from 'primeng/tabview';
import {CodeHighlighterModule} from 'primeng/codehighlighter';

@NgModule({
	imports: [
		CommonModule,
		SplitButtonDemoRoutingModule,
        SplitButtonModule,
        ToastModule,
        TabViewModule,
        CodeHighlighterModule
	],
	declarations: [
		SplitButtonDemo
	]
})
export class SplitButtonDemoModule {}
