import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BadgeDemo} from './badgedemo';
import {BadgeDemoRoutingModule} from './badgedemo-routing.module';
import {ButtonModule} from 'primeng/button';
import {PanelModule} from 'primeng/panel';
import {TabViewModule} from 'primeng/tabview';
import {AppCodeModule} from '../../app.code.component';

@NgModule({
	imports: [
		CommonModule,
		BadgeDemoRoutingModule,
        ButtonModule,
        PanelModule,
        TabViewModule,
        AppCodeModule
	],
	declarations: [
		BadgeDemo
	]
})
export class BadgeDemoModule {}
