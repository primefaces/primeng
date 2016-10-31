import {NgModule}     from '@angular/core';
import {CommonModule} from '@angular/common';
import {DataScrollerDemo} from './datascrollerdemo';
import {DataScrollerSubMenu} from './datascrollersubmenu';
import {DataScrollerInfiniteDemo} from './datascrollerinfinitedemo';
import {DataScrollerInlineDemo} from './datascrollerinlinedemo';
import {DataScrollerLoaderDemo} from './datascrollerloaderdemo';
import {DatascrollerDemoRoutingModule} from './datascrollerdemo-routing.module';
import {DataScrollerModule} from '../../../components/datascroller/datascroller';
import {DialogModule} from '../../../components/dialog/dialog';
import {GrowlModule} from '../../../components/growl/growl';
import {TabViewModule} from '../../../components/tabview/tabview';
import {CodeHighlighterModule} from '../../../components/codehighlighter/codehighlighter';

@NgModule({
	imports: [
		CommonModule,
		DatascrollerDemoRoutingModule,
        DataScrollerModule,
        DialogModule,
        GrowlModule,
        TabViewModule,
        CodeHighlighterModule
	],
	declarations: [
		DataScrollerDemo,
        DataScrollerInfiniteDemo,
        DataScrollerInlineDemo,
        DataScrollerLoaderDemo,
        DataScrollerSubMenu
	]
})
export class DataScrollerDemoModule {}
