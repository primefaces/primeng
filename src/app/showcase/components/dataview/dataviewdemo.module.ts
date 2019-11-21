import {NgModule}     from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {DataViewDemo} from './dataviewdemo';
import {DataViewDemoRoutingModule} from './dataviewdemo-routing.module';
import {DataViewModule} from '../../../components/dataview/dataview';
import {PanelModule} from '../../../components/panel/panel';
import {InputTextModule} from '../../../components/inputtext/inputtext';
import {ButtonModule} from '../../../components/button/button';
import {DialogModule} from '../../../components/dialog/dialog';
import {DropdownModule} from '../../../components/dropdown/dropdown';
import {TabViewModule} from '../../../components/tabview/tabview';

import {CodeHighlighterModule} from '../../../components/codehighlighter/codehighlighter';

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