import {NgModule}     from '@angular/core';
import {CommonModule} from '@angular/common';
import {PanelDemo} from './paneldemo';
import {PanelDemoRoutingModule} from './paneldemo-routing.module';
import {PanelModule} from '../../../components/panel/panel';
import {GrowlModule} from '../../../components/growl/growl';
import {SplitButtonModule} from '../../../components/splitbutton/splitbutton';
import {TabViewModule} from '../../../components/tabview/tabview';
import {CodeHighlighterModule} from '../../../components/codehighlighter/codehighlighter';

@NgModule({
	imports: [
		CommonModule,
		PanelDemoRoutingModule,
        PanelModule,
        GrowlModule,
        SplitButtonModule,
        TabViewModule,
        CodeHighlighterModule
	],
	declarations: [
		PanelDemo
	]
})
export class PanelDemoModule {}
