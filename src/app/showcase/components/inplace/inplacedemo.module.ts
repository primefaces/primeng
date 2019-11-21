import {NgModule}     from '@angular/core';
import {CommonModule} from '@angular/common';
import {InplaceDemo} from './inplacedemo';
import {InplaceDemoRoutingModule} from './inplacedemo-routing.module';
import {InplaceModule} from '../../../components/inplace/inplace';
import {InputTextModule} from '../../../components/inputtext/inputtext';
import {TableModule} from '../../../components/table/table';
import {TabViewModule} from '../../../components/tabview/tabview';
import {CodeHighlighterModule} from '../../../components/codehighlighter/codehighlighter';

@NgModule({
	imports: [
		CommonModule,
		InplaceDemoRoutingModule,
        InplaceModule,
        InputTextModule,
        TableModule,
        TabViewModule,
        CodeHighlighterModule
	],
	declarations: [
		InplaceDemo
	]
})
export class InplaceDemoModule {}
