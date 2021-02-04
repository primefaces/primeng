import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProgressSpinnerDemo} from './progressspinnerdemo';
import {ProgressSpinnerDemoRoutingModule} from './progressspinnerdemo-routing.module';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {TabViewModule} from 'primeng/tabview';
import {AppCodeModule} from '../../app.code.component';

@NgModule({
	imports: [
		CommonModule,
		ProgressSpinnerDemoRoutingModule,
        ProgressSpinnerModule,
        TabViewModule,
        AppCodeModule
	],
	declarations: [
		ProgressSpinnerDemo
	]
})
export class ProgressSpinnerDemoModule {}
