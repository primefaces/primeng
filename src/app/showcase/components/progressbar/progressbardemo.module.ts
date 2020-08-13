import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProgressBarDemo} from './progressbardemo';
import {ProgressBarDemoRoutingModule} from './progressbardemo-routing.module';
import {ProgressBarModule} from 'primeng/progressbar';
import {ToastModule} from 'primeng/toast';
import {TabViewModule} from 'primeng/tabview';
import {AppCodeModule} from '../../app.code.component';

@NgModule({
	imports: [
		CommonModule,
		ProgressBarDemoRoutingModule,
        ProgressBarModule,
        ToastModule,
        TabViewModule,
        AppCodeModule
	],
	declarations: [
		ProgressBarDemo
	]
})
export class ProgressBarDemoModule {}
