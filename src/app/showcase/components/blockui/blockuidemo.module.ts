import {NgModule}     from '@angular/core';
import {CommonModule} from '@angular/common';
import {BlockUIDemo} from './blockuidemo';
import {BlockUIDemoRoutingModule} from './blockuidemo-routing.module';
import {BlockUIModule} from '../../../components/blockui/blockui';
import {ButtonModule} from '../../../components/button/button';
import {PanelModule} from '../../../components/panel/panel';
import {TabViewModule} from '../../../components/tabview/tabview';
import {CodeHighlighterModule} from '../../../components/codehighlighter/codehighlighter';

@NgModule({
	imports: [
		CommonModule,
		BlockUIDemoRoutingModule,
        BlockUIModule,
        ButtonModule,
        PanelModule,
        TabViewModule,
        CodeHighlighterModule
	],
	declarations: [
		BlockUIDemo
	]
})
export class BlockUIDemoModule {}
