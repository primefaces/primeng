import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {DataViewDemo} from './dataviewdemo';
import {DataViewDemoRoutingModule} from './dataviewdemo-routing.module';
import {DataViewModule} from 'primeng/dataview';
import {PanelModule} from 'primeng/panel';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {DialogModule} from 'primeng/dialog';
import {DropdownModule} from 'primeng/dropdown';
import {TabViewModule} from 'primeng/tabview';

import {CodeHighlighterModule} from 'primeng/codehighlighter';

@NgModule({
	imports: [
        CommonModule,
        FormsModule,
		DataViewDemoRoutingModule,
        DataViewModule,
        PanelModule,
        DialogModule,
        DropdownModule,
        TabViewModule,
        InputTextModule,
        ButtonModule,
        CodeHighlighterModule
	],
	declarations: [
		DataViewDemo
	]
})
export class DataViewDemoModule {}