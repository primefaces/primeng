import {NgModule}     from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule}    from '@angular/forms';
import {ChipsDemo} from './chipsdemo';
import {ChipsDemoRoutingModule} from './chipsdemo-routing.module';
import {ChipsModule} from '../../../components/chips/chips';
import {ButtonModule} from '../../../components/button/button';
import {TabViewModule} from '../../../components/tabview/tabview';
import {CodeHighlighterModule} from '../../../components/codehighlighter/codehighlighter';

@NgModule({
	imports: [
		CommonModule,
        FormsModule,
		ChipsDemoRoutingModule,
        ChipsModule,
        ButtonModule,
        TabViewModule,
        CodeHighlighterModule
	],
	declarations: [
		ChipsDemo
	]
})
export class ChipsDemoModule {}
