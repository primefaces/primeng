import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AccordionDemo} from './accordiondemo';
import {AccordionDemoRoutingModule} from './accordiondemo-routing.module';
import {AccordionModule} from 'primeng/accordion';
import {ButtonModule} from 'primeng/button';
import {TabViewModule} from 'primeng/tabview';
import {ToastModule} from 'primeng/toast';
import { AppCodeModule } from '../../app.code.component';

@NgModule({
	imports: [
		CommonModule,
		AccordionDemoRoutingModule,
        AccordionModule,
        ButtonModule,
        TabViewModule,
		ToastModule,
		AppCodeModule
	],
	declarations: [
		AccordionDemo
	]
})
export class AccordionDemoModule {}
