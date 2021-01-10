import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BreadcrumbDemo} from './breadcrumbdemo';
import {BreadcrumbDemoRoutingModule} from './breadcrumbdemo-routing.module';
import {BreadcrumbModule} from 'primeng/breadcrumb';
import {TabViewModule} from 'primeng/tabview';
import { AppCodeModule } from '../../app.code.component';

@NgModule({
	imports: [
		CommonModule,
		BreadcrumbDemoRoutingModule,
        BreadcrumbModule,
		TabViewModule,
		AppCodeModule
	],
	declarations: [
		BreadcrumbDemo
	]
})
export class BreadcrumbDemoModule {}
