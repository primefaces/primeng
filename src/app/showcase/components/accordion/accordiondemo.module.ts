import {NgModule}     from '@angular/core';
import {CommonModule} from '@angular/common';
import {AccordionDemo} from './accordiondemo';
import {AccordionDemoRoutingModule} from './accordiondemo-routing.module';
import {AccordionModule} from '../../../components/accordion/accordion';
import {ButtonModule} from '../../../components/button/button';
import {TabViewModule} from '../../../components/tabview/tabview';
import {ToastModule} from '../../../components/toast/toast';
import {CodeHighlighterModule} from '../../../components/codehighlighter/codehighlighter';

@NgModule({
	imports: [
		CommonModule,
		AccordionDemoRoutingModule,
        AccordionModule,
        ButtonModule,
        TabViewModule,
        ToastModule,
        CodeHighlighterModule
	],
	declarations: [
		AccordionDemo
	]
})
export class AccordionDemoModule {}
