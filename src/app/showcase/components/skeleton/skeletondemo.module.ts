import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SkeletonDemo} from './skeletondemo';
import {SkeletonDemoRoutingModule} from './skeletondemo-routing.module';
import {ButtonModule} from 'primeng/button';
import {PanelModule} from 'primeng/panel';
import {TabViewModule} from 'primeng/tabview';
import {AppCodeModule} from '../../app.code.component';
import {SkeletonModule} from 'primeng/skeleton';
import {TableModule} from 'primeng/table';

@NgModule({
	imports: [
		CommonModule,
		SkeletonDemoRoutingModule,
        ButtonModule,
        PanelModule,
		TabViewModule,
		SkeletonModule,
		TableModule,
		AppCodeModule
	],
	declarations: [
		SkeletonDemo
	]
})
export class SkeletonDemoModule {}
