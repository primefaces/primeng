import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StepsDemo} from './stepsdemo';
import {StepsDemoRoutingModule} from './stepsdemo-routing.module';
import {StepsModule} from 'primeng/steps';
import {ToastModule} from 'primeng/toast';
import {TabViewModule} from 'primeng/tabview';
import { AppCodeModule } from '../../app.code.component';

@NgModule({
	imports: [
		CommonModule,
		StepsDemoRoutingModule,
        StepsModule,
        ToastModule,
		TabViewModule,
		AppCodeModule,
	],
	declarations: [
		StepsDemo
	]
})
export class StepsDemoModule {}
