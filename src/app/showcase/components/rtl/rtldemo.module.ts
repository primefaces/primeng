import {NgModule}     from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule}    from '@angular/forms';
import {RTLDemo} from './rtldemo';
import {RTLDemoRoutingModule} from './rtldemo-routing.module';
import {DialogModule} from '../../../components/dialog/dialog';
import {InputTextModule} from '../../../components/inputtext/inputtext';
import {ButtonModule} from '../../../components/button/button';
import {AccordionModule} from '../../../components/accordion/accordion';
import {TabViewModule} from '../../../components/tabview/tabview';
import {CodeHighlighterModule} from '../../../components/codehighlighter/codehighlighter';

@NgModule({
	imports: [
		CommonModule,
		RTLDemoRoutingModule,
        FormsModule,
        DialogModule,
        ButtonModule,
        InputTextModule,
        AccordionModule,
        TabViewModule,
        CodeHighlighterModule
	],
	declarations: [
		RTLDemo
	]
})
export class RTLDemoModule {}
