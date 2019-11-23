import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OverlayPanelDemo} from './overlaypaneldemo';
import {OverlayPanelDemoRoutingModule} from './overlaypaneldemo-routing.module';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {TabViewModule} from 'primeng/tabview';
import {CodeHighlighterModule} from 'primeng/codehighlighter';

@NgModule({
	imports: [
		CommonModule,
		OverlayPanelDemoRoutingModule,
        OverlayPanelModule,
        ButtonModule,
        TableModule,
        TabViewModule,
        CodeHighlighterModule
	],
	declarations: [
		OverlayPanelDemo
	]
})
export class OverlayPanelDemoModule {}
