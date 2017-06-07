import {NgModule}     from '@angular/core';
import {CommonModule} from '@angular/common';
import {OverlayPanelDemo} from './overlaypaneldemo';
import {OverlayPanelDemoRoutingModule} from './overlaypaneldemo-routing.module';
import {OverlayPanelModule} from '../../../components/overlaypanel/overlaypanel';
import {ButtonModule} from '../../../components/button/button';
import {DataTableModule} from '../../../components/datatable/datatable';
import {TabViewModule} from '../../../components/tabview/tabview';
import {CodeHighlighterModule} from '../../../components/codehighlighter/codehighlighter';

@NgModule({
	imports: [
		CommonModule,
		OverlayPanelDemoRoutingModule,
        OverlayPanelModule,
        ButtonModule,
        DataTableModule,
        TabViewModule,
        CodeHighlighterModule
	],
	declarations: [
		OverlayPanelDemo
	]
})
export class OverlayPanelDemoModule {}
