import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MegaMenuDemo} from './megamenudemo';
import {MegaMenuDemoRoutingModule} from './megamenudemo-routing.module';
import {MegaMenuModule} from 'primeng/megamenu';
import {TabViewModule} from 'primeng/tabview';
import {CodeHighlighterModule} from 'primeng/codehighlighter';


@NgModule({
	imports: [
		CommonModule,
		MegaMenuDemoRoutingModule,
        MegaMenuModule,
        TabViewModule,
        CodeHighlighterModule
	],
	declarations: [
		MegaMenuDemo
	]
})
export class MegaMenuDemoModule {}
