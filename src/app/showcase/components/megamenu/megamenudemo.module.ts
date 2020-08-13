import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MegaMenuDemo} from './megamenudemo';
import {MegaMenuDemoRoutingModule} from './megamenudemo-routing.module';
import {MegaMenuModule} from 'primeng/megamenu';
import {TabViewModule} from 'primeng/tabview';
import {AppCodeModule} from '../../app.code.component';

@NgModule({
	imports: [
		CommonModule,
		MegaMenuDemoRoutingModule,
        MegaMenuModule,
		TabViewModule,
		AppCodeModule
	],
	declarations: [
		MegaMenuDemo
	]
})
export class MegaMenuDemoModule {}
