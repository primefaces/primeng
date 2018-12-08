import {NgModule}     from '@angular/core';
import {CommonModule} from '@angular/common';
import {TooltipDemo} from './tooltipdemo';
import {TooltipDemoRoutingModule} from './tooltipdemo-routing.module';
import {TooltipModule} from '../../../components/tooltip/tooltip';
import {InputTextModule} from '../../../components/inputtext/inputtext';
import {TabViewModule} from '../../../components/tabview/tabview';
import {CodeHighlighterModule} from '../../../components/codehighlighter/codehighlighter';
import { OverlayPanelModule } from 'src/app/components/overlaypanel/overlaypanel';
import { ButtonModule } from 'src/app/components/button/button';

@NgModule({
	imports: [
		CommonModule,
		TooltipDemoRoutingModule,
        TooltipModule,
        InputTextModule,
        TabViewModule,
		CodeHighlighterModule,
		OverlayPanelModule,
		ButtonModule
	],
	declarations: [
		TooltipDemo
	]
})
export class TooltipDemoModule {}
