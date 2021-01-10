import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InplaceDemo} from './inplacedemo';
import {InplaceDemoRoutingModule} from './inplacedemo-routing.module';
import {InplaceModule} from 'primeng/inplace';
import {InputTextModule} from 'primeng/inputtext';
import {TableModule} from 'primeng/table';
import {TabViewModule} from 'primeng/tabview';
import {AppCodeModule} from '../../app.code.component';

@NgModule({
	imports: [
		CommonModule,
		InplaceDemoRoutingModule,
        InplaceModule,
        InputTextModule,
        TableModule,
        TabViewModule,
        AppCodeModule
	],
	declarations: [
		InplaceDemo
	]
})
export class InplaceDemoModule {}
