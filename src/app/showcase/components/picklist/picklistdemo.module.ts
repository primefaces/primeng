import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PickListDemo} from './picklistdemo';
import {PickListDemoRoutingModule} from './picklistdemo-routing.module';
import {PickListModule} from 'primeng/picklist';
import {TabViewModule} from 'primeng/tabview';
import {CodeHighlighterModule} from 'primeng/codehighlighter';

@NgModule({
	imports: [
		CommonModule,
		PickListDemoRoutingModule,
        PickListModule,
        TabViewModule,
        CodeHighlighterModule
	],
	declarations: [
		PickListDemo
	]
})
export class PickListDemoModule {}
