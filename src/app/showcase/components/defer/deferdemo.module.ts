import {NgModule}     from '@angular/core';
import {CommonModule} from '@angular/common';
import {DeferDemo} from './deferdemo';
import {DeferDemoRoutingModule} from './deferdemo-routing.module';
import {DeferModule} from '../../../components/defer/defer';
import {DataTableModule} from '../../../components/datatable/datatable';
import {GrowlModule} from '../../../components/growl/growl';
import {TabViewModule} from '../../../components/tabview/tabview';
import {CodeHighlighterModule} from '../../../components/codehighlighter/codehighlighter';

@NgModule({
	imports: [
		CommonModule,
		DeferDemoRoutingModule,
        DeferModule,
        GrowlModule,
        TabViewModule,
        DataTableModule,
        CodeHighlighterModule
	],
	declarations: [
		DeferDemo
	]
})
export class DeferDemoModule {}
